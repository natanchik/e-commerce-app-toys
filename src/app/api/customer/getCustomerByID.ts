import { UserState } from '../../types/types';
import { addUserState } from '../helpers/utils';
import { BaseUrl } from '../../components/constants';

export const getCustomerByID = async (customerID: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(`${BaseUrl}/customers/${customerID}`, requestOptions)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      addUserState(res);
    });
};

export const fillUserState = async (email: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(`${BaseUrl}/customers?limit=500`, requestOptions)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      const currentCustomer: UserState = res.results.find((customer: UserState) => {
        return customer.email === email;
      });
      addUserState(currentCustomer);
    });
};
