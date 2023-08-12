import { getCustomerByID } from './getCustomerByID';
import { loginAfterRegistration } from './loginCustomer';

// TODO remove this eslint-disable
/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

// TODO take raw data from registration form
const data = {
  email: 'TomWhite@example.com',
  firstName: 'Tom',
  lastName: 'White',
  password: 'secret1234',
  dateOfBirth: '1998-10-12',
  salutation: 'Mr.',
  addresses: [
    { country: 'KZ', city: 'Shymkent', streetName: 'Gagarin', postalCode: '160000' },
    { country: 'KZ', city: 'Shymkent', streetName: 'Turkistanskaya', postalCode: '160000' },
  ],
};

// TODO add interfaces for addresses and acions
const getCurrentActions = (
  addresses: {
    [key: string]: string;
  }[],
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
      // TODO add checking of default value - if checkDefault or not
      // if (checkDefault) {
      //   currentActions.push(
      //     {
      //       action: 'setDefaultBillingAddress',
      //       addressId: addresses[0].id,
      //     },
      //     {
      //       action: 'setDefaultShippingAddress',
      //       addressId: addresses[0].id,
      //     },
      //   );
      // }
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
      // TODO add checking of default value - if checkDefault or not
      // if (checkDefaultBilling) {
      //   currentActions.push({
      //     action: 'setDefaultBillingAddress',
      //     addressId: addresses[0].id,
      //   });
      // } else if (checkDefaultShipping) {
      //   currentActions.push({
      //     action: 'setDefaultShippingAddress',
      //     addressId: addresses[1].id,
      //   });
      // }
      break;
  }

  return currentActions;
};

const createCustomer = (): void => {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  )
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
            throw new Error(
              `This email address already exists, please log in or use another email address`,
            );
          default:
            throw new Error(
              `The error with status code ${res.status} has occured, please try later`,
            );
        }
      }
    })
    // TODO function() {if success --> redirect to main page}
    .then((res) => {
      const customerID = res.customer.id;
      const addresses = res.customer.addresses;
      const currentActions = getCurrentActions(addresses);
      const dataForAddressActions = JSON.stringify({
        version: 1,
        actions: currentActions,
      });
      fetch(
        `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerID}`,
        { method: 'POST', headers: myHeaders, body: dataForAddressActions },
      )
        .then(() => {
          const username = data.email;
          const password = data.password;
          loginAfterRegistration(username, password);
          getCustomerByID(customerID);
        })
        .catch((err) => {
          if (err instanceof Error) {
            console.log(`${err.message}`);
          }
        });
    })
    .catch((err) => {
      if (err instanceof Error) {
        // TODO function() {create or fill message box for error}
        console.log(`${err.message}`);
      }
    });
};

export default createCustomer;
