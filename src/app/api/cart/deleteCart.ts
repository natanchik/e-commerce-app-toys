import User from '../../components/user';
import { BASIC_URL } from '../helpers/constants';

export async function deleteCart(id: string): Promise<void> {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  };

  const version = localStorage.cart ? JSON.parse(localStorage.cart).version : 1;

  fetch(`${BASIC_URL}me/carts/${id}?version=${version}`, requestOptions)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_get-cart', error.message);
    });
}
