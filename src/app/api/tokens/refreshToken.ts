const myHeaders = {
  Authorization: 'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

const refreshToken = async (refreshToken: string): Promise<void> => {
  return fetch(
    `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/anonymous/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
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
      localStorage.setItem('anonymous_token', JSON.stringify(res));
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_get-anonymous-token', error.message);
      alert('Sorry, your token has expired. Please refresh to continue.');
    });
};

export default refreshToken;
