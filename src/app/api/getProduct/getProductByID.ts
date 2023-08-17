import accessToken from '../helpers/api-consts';

const productID = '554109e7-7c41-4002-8140-eb9344aac28c';

// TODO прокидывать id в параметры функции
const getProductByID = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products/${productID}`,
    requestOptions,
  ).then((response) => response.text());
  // .then((result) => console.log(result))
  // .catch((error) => console.log('error', error));
};

export default getProductByID;
