export interface RouteInfo {
  path: string;
  callback: () => void;
}

export interface UrlInfo {
  pathname: string;
  cardId: string;
}
