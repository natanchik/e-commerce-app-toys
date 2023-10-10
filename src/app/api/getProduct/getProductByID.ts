import { Product } from '../../types/types';
import { BaseUrl } from '../../components/constants';

const getProductByID = async (productID: string): Promise<Product> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch(`${BaseUrl}/products/${productID}`, requestOptions);

  const result = await res.json();
  return result;
};

export default getProductByID;
