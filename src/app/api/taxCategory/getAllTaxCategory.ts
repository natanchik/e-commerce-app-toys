import { BASIC_URL } from '../helpers/constants';

export const getAllTaxCategories = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(`${BASIC_URL}tax-categories`, requestOptions).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw new Error(`The error with status code ${res.status} has occured, please try later`);
    }
  });
};
