import { AUTORIZATION_CODE, URL } from '../helpers/constants';

const requestOptions = {
  method: 'POST',
  headers: {
    Authorization: `${AUTORIZATION_CODE}`,
  },
};

const getAccessToken = async (): Promise<void> => {
  return fetch(`${URL}oauth/token?grant_type=client_credentials`, requestOptions)
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
    .catch((error) => {
      if (error) localStorage.setItem('error_get-access-token', error.message);
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getAccessToken;
