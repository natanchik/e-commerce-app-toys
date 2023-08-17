const getAllProducts = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products',
    requestOptions,
  ).then((response) => response.text());
  // .then((result) => console.log(result))
  // .catch((error) => console.log('error', error));
};

export default getAllProducts;
