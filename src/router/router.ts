import { RouteInfo, UrlInfo } from '../types/types';
import pages from './pages';

class Router {
  routes: RouteInfo[];

  constructor(routes: RouteInfo[]) {
    this.routes = routes;
  }

  public navigate(url: string): void {
    const request = this.parceUrl(url);

    const pathToFind =
      request.cardId === '' ? request.pathname : `${request.pathname}/${request.cardId}`;
    const route = this.routes.find((item: RouteInfo) => item.path === pathToFind);

    if (!route) {
      this.redirectToNotFound();
      return;
    }

    route?.callback();
  }

  private parceUrl(url: string): UrlInfo {
    const paths = url.split('/');
    const result: UrlInfo = {
      pathname: paths[0] ? paths[0] : '',
      cardId: paths[1] ? paths[1] : '',
    };

    return result;
  }

  private redirectToNotFound(): void {
    this.navigate(pages.NOT_FOUND);
  }
}

export default Router;
