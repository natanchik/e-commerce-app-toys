/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

const customerID = 'ccf1d98a-7ffc-41b7-b404-a793fb8408a6';

// TODO прокидывать id в параметры функции
const getCustomerByID = (): void => {
  fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerID}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

export default getCustomerByID;
