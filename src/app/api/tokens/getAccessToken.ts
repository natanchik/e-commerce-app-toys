const requestOptions = {
  method: 'POST',
  headers: {
    Authorization: 'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
  },
};

const getAccessToken = (): void => {
  fetch(
    'https://auth.australia-southeast1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
    requestOptions,
  )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please reload page`);
      }
    })
    .then((res) => {
      localStorage.setItem('token_info', JSON.stringify(res));
      localStorage.setItem('type_of_token', 'client-credentials');
    })
    .catch((error) => {});
};

export default getAccessToken;
