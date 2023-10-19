import { Product } from '../../types/types';
import { BASIC_URL } from '../helpers/constants';

const getProductByID = async (productID: string): Promise<Product> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch(`${BASIC_URL}products/${productID}`, requestOptions);

  const result = await res.json();
  return result;
};

export default getProductByID;
