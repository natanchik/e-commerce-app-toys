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
