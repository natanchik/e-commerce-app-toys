/* eslint-disable no-console */
const requestOptions = {
  method: 'POST',
  headers: {
    Authorization:
      // INFO вот здесь используется кодировка BASE64 для скрытия client_ID и client_secret (см. basic auth)
      'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
  },
};

const getAccessToken = (): void => {
  fetch(
    'https://auth.australia-southeast1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(`Access_token_client: ${result.access_token}`);
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('type_of_token', 'client_credentials');
    })
    .catch((error) => console.log('error', error));
};

export default getAccessToken;
