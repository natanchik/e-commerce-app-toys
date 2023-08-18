import { AddressFromAPI, RegisterData } from '../../types/types';
import { getCustomerByID } from './getCustomerByID';
import { loginAfterRegistration } from './loginCustomer';

const customersURL = 'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers';

const getCurrentActions = (
  addresses: AddressFromAPI[],
  checkDefaultBilling: boolean,
  checkDefaultShipping: boolean,
): { action: string; addressId: string }[] => {
  const currentActions: { action: string; addressId: string }[] = [];
  switch (addresses.length) {
    case 1:
      currentActions.push(
        {
          action: 'addBillingAddressId',
          addressId: addresses[0].id,
        },
        {
          action: 'addShippingAddressId',
          addressId: addresses[0].id,
        },
      );
      if (checkDefaultBilling) {
        currentActions.push(
          {
            action: 'setDefaultBillingAddress',
            addressId: addresses[0].id,
          },
          {
            action: 'setDefaultShippingAddress',
            addressId: addresses[0].id,
          },
        );
      }
      break;
    case 2:
      currentActions.push(
        {
          action: 'addBillingAddressId',
          addressId: addresses[0].id,
        },
        {
          action: 'addShippingAddressId',
          addressId: addresses[1].id,
        },
      );
      if (checkDefaultBilling) {
        currentActions.push({
          action: 'setDefaultBillingAddress',
          addressId: addresses[0].id,
        });
      }
      if (checkDefaultShipping) {
        currentActions.push({
          action: 'setDefaultShippingAddress',
          addressId: addresses[1].id,
        });
      }
      break;
  }

  return currentActions;
};

const createCustomer = async (
  data: RegisterData,
  checkDefaultBilling: boolean,
  checkDefaultShipping: boolean,
): Promise<void> => {
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

  await fetch(customersURL, requestOptions)
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
      const addresses = res.customer.addresses;
      const currentActions = getCurrentActions(addresses, checkDefaultBilling, checkDefaultShipping);
      const dataForAddressActions = JSON.stringify({
        version: 1,
        actions: currentActions,
      });
      await fetch(`${customersURL}/${customerID}`, { method: 'POST', headers: myHeaders, body: dataForAddressActions })
        .then(async () => {
          loginAfterRegistration(data.email, data.password);
          await getCustomerByID(customerID);
          apiStatus.classList.add('success-status__register');
          apiStatus.innerHTML = `Enjoy the shopping!`;
        })
        .catch((err) => {
          if (err instanceof Error) {
            apiStatus.classList.add('error-status__register');
            apiStatus.innerHTML = `${err.message}`;

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
        apiStatus.classList.add('error-status__register');
        apiStatus.innerHTML = `${err.message}`;

        if (apiStatus.innerHTML === `This email address already exists, please log in or use another email address`) {
          emailInput.classList.add('error-input');
        }
      }
    });
};

export default createCustomer;
