import { AddressFromAPI } from '../../../types/types';
import { pushCurrentAction } from '../../helpers/utils';
import { getCustomerByID } from '../getCustomerByID';
import { loginAfterRegistration } from '../loginCustomer';

const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me`;

const pushCurrentActions = pushCurrentAction.bind(null, 'addressId');

// const getAddressData = (
//   address: AddressFromAPI,
//   checkDefaultBilling: boolean,
//   checkDefaultShipping: boolean,
//   type: string,
// ): { action: string; addressId: string }[] => {
//   const currentActions: CurrentAction[] = [];
//   currentActions.push(
//     pushCurrentActions(type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId', address.id),
//   );
//   if (type === 'billing' ? checkDefaultBilling : checkDefaultShipping) {
//     currentActions.push(
//       pushCurrentActions(type === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress', address.id),
//     );
//   }
//   return currentActions;
// };

const addAddress = async (address: AddressFromAPI): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };
  const raw = JSON.stringify(address);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
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
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async (res) => {
      const customerID = res.customer.id;
      // const addresses = res.customer.addresses;
      const currentActions = pushCurrentActions('changeAddress', address.id);
      const dataForActions = JSON.stringify({
        version: 1,
        actions: currentActions,
      });
      await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: dataForActions })
        .then(async () => {
          await loginAfterRegistration(localStorage.userState.email, localStorage.userState.password);
          await getCustomerByID(customerID);
          addApiStatus('success-status__update', `Update was successful!`);
        })
        .catch((err) => {
          if (err instanceof Error) {
            addApiStatus('error-status__update', err.message);
          }
        });
    })
    .catch((err) => {
      if (err instanceof Error) {
        addApiStatus('error-status__update', err.message);
      }
    });
};

export default addAddress;
