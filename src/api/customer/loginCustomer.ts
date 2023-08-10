/* eslint-disable no-console */
const myHeaders = {
  Authorization:
    // INFO вот здесь используется кодировка BASE64 для скрытия client_ID и client_secret (см. basic auth)
    'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

// TODO take raw data from login form
const raw = {
  username: 'johndoe12@example.com',
  password: 'secret1234',
};

const loginCustomer = (username = raw.username, password = raw.password): void => {
  fetch(
    `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token?grant_type=password&username=${username}&password=${password}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(`Customer_token: ${result.access_token}`);
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('type_of_token', 'customer');
    })
    .catch((error) => console.log('error', error));
};

export default loginCustomer;
