import { pushCurrentAction, addUserState } from '../../helpers/utils';

const updateCustomerNames = async (newFirstName: string, newLastName: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };
  const currentActions = [
    pushCurrentAction('firstName', 'setFirstName', newFirstName),
    pushCurrentAction('lastName', 'setLastName', newLastName),
  ];
  const dataForActions = JSON.stringify({
    version: JSON.parse(localStorage.userState).version,
    actions: currentActions,
  });
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const addApiStatus = (className: string, errMessage: string): void => {
    apiStatus.classList.add(className);
    apiStatus.innerHTML = errMessage;
  };
  const customerId = JSON.parse(localStorage.userState).id;
  const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerId}`;

  await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: dataForActions })
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async (res) => {
      addApiStatus('success-status__update', `Update was successful!`);
      addUserState(res);
    })
    .catch((err) => {
      if (err instanceof Error) {
        addApiStatus('error-status__update', err.message);
      }
    });
};

export default updateCustomerNames;
