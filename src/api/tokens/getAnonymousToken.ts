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

const getAnonymousToken = (): void => {
  fetch(
    'https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/anonymous/token?grant_type=client_credentials',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(`Anonymous_token: ${result.access_token}`);
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('type_of_token', 'anonymous');
    })
    .catch((error) => console.log('error', error));
};

export default getAnonymousToken;
