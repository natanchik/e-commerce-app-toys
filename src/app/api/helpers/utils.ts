import { QueryParam, UserState } from '../../types/types';

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
    defaultBillingAddressId: customer.defaultBillingAddressId,
    defaultShippingAddressId: customer.defaultShippingAddressId,
  };
  localStorage.setItem('userState', JSON.stringify(userState));
};

export const generateQueryParams = (queryParams: QueryParam[] = []): string => {
  return `?${queryParams.map((x) => `${x.key}=${x.value}`).join('&')}`;
};