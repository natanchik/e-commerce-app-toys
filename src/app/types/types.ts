export interface RouteInfo {
  path: string;
  callback: () => void;
}

export interface UrlInfo {
  pathname: string;
  cardId: string;
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
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
