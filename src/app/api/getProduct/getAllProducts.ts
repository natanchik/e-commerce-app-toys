import { generateQueryParams } from '../helpers/utils';
import { catalogQueryParams } from '../../state/state';

const getAllProducts = (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products?limit=500${
      catalogQueryParams.size > 0 ? generateQueryParams(catalogQueryParams) : ''
    }`,
    requestOptions,
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error(`The error with status code ${response.status} has occured, please try later`);
      }
    })
    .then((result) => {
      if (catalogQueryParams.size === 0) {
        localStorage.setItem('all_products', JSON.stringify(result.results));
      } else {
        localStorage.setItem('sorted_products', JSON.stringify(result.results));
      }
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_products_message', error.value);
    });
};

export default getAllProducts;
