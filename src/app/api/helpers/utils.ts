import { UserState } from '../../types/types';

export const addUserState = (customer: UserState): void => {
  const userState: UserState = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    email: customer.email,
    addresses: customer.addresses,
    id: customer.id,
    shippingAddressIds: customer.shippingAddressIds,
    billingAddressIds: customer.billingAddressIds,
    defaultBillingAddress: customer.defaultBillingAddress,
    defaultShippingAddress: customer.defaultShippingAddress,
  };
  localStorage.setItem('userState', JSON.stringify(userState));
};
