import User from '../../components/user';

export const getMyCarts = async (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts',
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
      localStorage.setItem('cart', JSON.stringify(res.results[0]));
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_get-carts', error.message);
    });
};
