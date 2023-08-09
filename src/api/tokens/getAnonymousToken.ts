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

const getAnonymousToken = (): void => {
  fetch(
    'https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/anonymous/token?grant_type=client_credentials',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => console.log(`Anonymous_token: ${result.access_token}`))
    .catch((error) => console.log('error', error));
};

export default getAnonymousToken;
