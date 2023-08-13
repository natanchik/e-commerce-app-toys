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
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('type_of_token', 'anonymous');
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    });
};

export default getAnonymousToken;
