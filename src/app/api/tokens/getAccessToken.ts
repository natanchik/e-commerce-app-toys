import { AuthUrl } from '../../components/constants';

const requestOptions = {
  method: 'POST',
  headers: {
    PO2qO7ERb7iI8OlmXElfNTi5: 'eKo_39j0suyLO7WaKBwUgwatNW-rmIVL',
    // Authorization: AuthorizationKey,
  },
};

const getAccessToken = async (): Promise<void> => {
  return fetch(
    `${AuthUrl}/oauth/token?grant_type=client_credentials&scope=manage_project:ecommerce-rs2023`,
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
    .catch((error) => {
      if (error) localStorage.setItem('error_get-access-token', error.message);
      // alert('Sorry, this is taking an unusually long time...');
      // alert('Access Token');
    });
};

export default getAccessToken;
