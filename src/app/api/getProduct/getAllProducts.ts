import { Product } from '../../types/types';

const getAllProducts = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const allProducts: Product[] = [];

  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products?limit=500',
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
      result.results.forEach((product: Product) => {
        allProducts.push(product);
      });
      localStorage.setItem('product_info', JSON.stringify(allProducts));
    });
};

export default getAllProducts;
