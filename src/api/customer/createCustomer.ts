/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

// TODO take raw data from registration form
const raw = JSON.stringify({
  email: 'TomWhite@example.com',
  firstName: 'Tom',
  lastName: 'White',
  password: 'secret1234',
  dateOfBirth: '1998-10-12',
  addresses: [
    { country: 'KZ', city: 'Shymkent', streetName: 'Gagarin', postalCode: '160000' },
    { country: 'KZ', city: 'Shymkent', streetName: 'Turkistanskaya', postalCode: '160000' },
  ],
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

const createCustomer = async (): Promise<void> => {
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
        return res;
      } else {
        switch (res.status) {
          case 400:
            throw new Error(`This email address already exists please enter a unique one`);
          default:
            throw new Error(`Catch error with status code ${res.status}`);
        }
      }
    })
    .then((res) => res?.json())
    // TODO function() {if success --> login and redirect to main page}
    .then(async (res) => {
      const customerID = res.customer.id;
      const addresses = res.customer.addresses;
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
          // add checking of default value - if checkDefault or not
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
          // add checking of default value - if checkDefault or not
          // if (checkDefaultBilling && checkDefaultShipping) {
          //   currentActions.push(
          //     {
          //       action: 'setDefaultBillingAddress',
          //       addressId: addresses[0].id,
          //     },
          //     {
          //       action: 'setDefaultShippingAddress',
          //       addressId: addresses[1].id,
          //     },
          //   );
          // } else if (checkDefaultBilling) {
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
      const dataForAddressActions = JSON.stringify({
        version: 1,
        actions: currentActions,
      });
      await fetch(
        `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerID}`,
        { method: 'POST', headers: myHeaders, body: dataForAddressActions },
      )
        .then((response) => response.json())
        .then((result) => console.log(result));
    })
    .catch((err) => {
      if (err instanceof Error) {
        // TODO function() {create or fill message box for error}
        console.log(`${err.message}`);
      }
    });
};

export default createCustomer;
