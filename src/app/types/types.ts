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

export interface Product {
  id: string;
  productType: ProductTypeReference;
  masterData: ProductCatalogData;
}

export interface ProductTypeReference {
  id: string;
  typeId: string;
  version: number;
  versionModifiedAt: string;
}

export interface ProductCatalogData {
  current: ProductData;
}

export interface ProductData {
  name: LocalizedString;
  categories: CategoryReference[];
  description: string;
  slug: string;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  //searchKeywords: string;
}

export type LocalizedString = {
  'en-US': string;
  'ru-KZ': string;
}

export interface CategoryReference {
  id: string;
  typeId: string;
}

export interface ProductVariant {
  id: number;
  key: string;
  sku: string;
  prices: Price[];
  price: Price;
  images: Image[];
}

export interface Price {
  country: string;
  id: string;
  key: string;
  value: TypedMoney;
  discounted: DiscountedPrice;
}

export interface TypedMoney {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
}

export interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

export interface ProductDiscountReference {
  id: string;
  typeId: string;
}

export interface Image {
  url: string;
  dimensions: ImageDimensions;
}

export interface ImageDimensions {
  w: number;
  h: number;
}
