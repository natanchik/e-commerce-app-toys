export interface RouteInfo {
  path: string;
  callback: () => void;
}

export interface UrlInfo {
  pathname: string;
  cardId: string;
}

export interface ValidTemplates {
  firstName: [RegExp, string];
  lastName: [RegExp, string];
  streetName: [RegExp, string];
  city: [RegExp, string];
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  id?: string;
}

export interface AddressFromAPI {
  [key: string]: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  salutation: string;
  addresses: Address[];
}

export interface UserState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: Address[];
  id: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export interface CurrentAction {
  action: string;
  addressId: string;
}

export interface CardData {
  title: string;
  images: { dimensions: { w: number; h: number }; url: string }[];
  prices: {
    value: string;
    discounted: string;
    currency: string;
  };
  details: string;
}
