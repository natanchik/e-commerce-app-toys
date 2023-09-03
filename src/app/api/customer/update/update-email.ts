import { CurrentAction } from '../../../types/types';
import { getCustomerByID } from '../getCustomerByID';
import { loginAfterRegistration } from '../loginCustomer';

const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me`;

const pushCurrentAction = (action: string, dataTitle: string, data: string): CurrentAction => {
  const currentAction = {
    action: action,
    [dataTitle]: data,
  };
  return currentAction;
};

const updateCustomer = async (data: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const emailInput = document.querySelector('#email') as HTMLInputElement;

  const addApiStatus = (className: string, errMessage: string): void => {
    apiStatus.classList.add(className);
    apiStatus.innerHTML = errMessage;
  };

  await fetch(customerURL, requestOptions)
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        switch (res.status) {
          case 400:
            throw new Error(`This email address already exists, please log in or use another email address`);
          default:
            throw new Error(`The error with status code ${res.status} has occured, please try later`);
        }
      }
    })
    .then(async (res) => {
      const customerID = res.customer.id;
      // const addresses = res.customer.addresses;
      const currentActions = pushCurrentAction('changeEmail', 'email', data);
      const dataForAddressActions = JSON.stringify({
        version: 1,
        actions: currentActions,
      });
      await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: dataForAddressActions })
        .then(async () => {
          await loginAfterRegistration(localStorage.userState.email, localStorage.userState.password);
          await getCustomerByID(customerID);
          addApiStatus('success-status__update', `Update was successful!`);
        })
        .catch((err) => {
          if (err instanceof Error) {
            addApiStatus('error-status__update', err.message);

            if (
              apiStatus.innerHTML === `This email address already exists, please log in or use another email address`
            ) {
              emailInput.classList.add('error-input');
            }
          }
        });
    })
    .catch((err) => {
      if (err instanceof Error) {
        addApiStatus('error-status__update', err.message);

        if (apiStatus.innerHTML === `This email address already exists, please log in or use another email address`) {
          emailInput.classList.add('error-input');
        }
      }
    });
};

export default updateCustomer;
