/* eslint-disable no-console */
const requestOptions = {
  method: 'POST',
  headers: {
    Authorization:
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
      console.log(`Access_token: ${result.access_token}`);
      localStorage.setItem('token', result.access_token);
    })
    .catch((error) => console.log('error', error));
};

export default getAccessToken;
