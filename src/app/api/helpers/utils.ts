import { UserState } from '../../types/types';

export const addUserState = (customer: UserState): void => {
  const userState: UserState = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    addresses: customer.addresses,
  };
  localStorage.setItem('userState', JSON.stringify(userState));
};
