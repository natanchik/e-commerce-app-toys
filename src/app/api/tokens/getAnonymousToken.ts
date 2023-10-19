import { AUTORIZATION_CODE, PROJECT_KEY, URL } from '../helpers/constants';

const myHeaders = {
  Authorization: `${AUTORIZATION_CODE}`,
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

const getAnonymousToken = async (): Promise<void> => {
  return fetch(
    `${URL}oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
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
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getAnonymousToken;
