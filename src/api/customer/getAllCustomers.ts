/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

const getAllCustomers = (): void => {
  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export default getAllCustomers;
