/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const raw = JSON.stringify({
  email: 'johndoe1@example.com',
  firstName: 'John1',
  lastName: 'Doe1',
  password: 'secret1234',
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

const createCustomer = (): void => {
  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export default createCustomer;
