/* eslint-disable no-console */
const myHeaders = {
  Authorization:
    'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

const username = 'johndoe1@example.com';
const password = 'secret1234';

const loginCustomer = (): void => {
  fetch(
    `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token?grant_type=password&username=${username}&password=${password}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log(`customer_token: ${result.access_token}`);
      console.log(`refresh: ${result.refresh_token}`);
      localStorage.setItem('customer_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
    })
    .catch((error) => console.log('error', error));
};

export default loginCustomer;
