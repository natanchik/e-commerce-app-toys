import { AuthUrl } from '../../components/constants';

const myHeaders = {
  // Authorization: AuthorizationKey,
  PO2qO7ERb7iI8OlmXElfNTi5: 'eKo_39j0suyLO7WaKBwUgwatNW-rmIVL',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

const getAnonymousToken = async (): Promise<void> => {
  return fetch(
    `${AuthUrl}/oauth/ecommerce-application-jsfe2023/anonymous/token?grant_type=client_credentials&scope=manage_project:ecommerce-rs2023`,
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
      // alert('Sorry, this is taking an unusually long time...');
      // alert('Anonymous Token');
    });
};

export default getAnonymousToken;
