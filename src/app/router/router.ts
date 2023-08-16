import { RouteInfo, UrlInfo } from '../types/types';
import pages from './pages';

class Router {
  routes: RouteInfo[];

  constructor(routes: RouteInfo[]) {
    this.routes = routes;
    this.setEventListeners();
  }

  public navigate(url: string, notPushState?: boolean): void {
    const request = this.parceUrl(url);

    const pathToFind = request.cardId === '' ? request.pathname : `${request.pathname}/${request.cardId}`;
    const route = this.routes.find((item: RouteInfo) => item.path === pathToFind);

    if (!route) {
      this.redirectToNotFound();
      return;
    }

    if (!notPushState) {
      window.history.pushState({}, '', `${route.path}`);
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

  private setEventListeners(): void {
    window.addEventListener('DOMContentLoaded', (event: Event): void => {
      event.preventDefault();
      const path = this.getCorrectPath();
      this.navigate(path);
    });

    window.addEventListener('popstate', (): void => {
      const path = this.getCorrectPath();
      this.navigate(path, true);
    });

    window.addEventListener('hashchange', (): void => {
      const path = this.getCorrectPath();
      this.navigate(path);
    });
  }

  private getCorrectPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }
}

export default Router;
