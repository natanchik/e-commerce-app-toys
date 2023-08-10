import pages from '../router/pages';
import { RouteInfo } from '../types/types';
import MainPage from './main-page';
import LoginPage from './autorization';
import NotFound from './not-found';
import AboutUS from './about-us';
import Header from './header';
import Main from './main';
import Footer from './footer';
import Router from '../router/router';

class App {
  router: Router;

  header: Header;

  main: Main;

  footer: Footer;

  constructor() {
    this.router = new Router(this.createRoutes());
    this.header = new Header(this.router);
    this.main = new Main();
    this.footer = new Footer(this.router);
  }

  public startApp(): void {
    this.router.navigate(pages.MAIN);
  }

  private createRoutes(): RouteInfo[] {
    return [
      {
        path: ``,
        callback: (): void => {
          const mainPage = new MainPage();
          Main.setContent(mainPage.drawMainPage());
        },
      },
      {
        path: `${pages.MAIN}`,
        callback: (): void => {
          const mainPage = new MainPage();
          Main.setContent(mainPage.drawMainPage());
        },
      },
      {
        path: `${pages.AUTORIZATION}`,
        callback: (): void => {
          const loginPage = new LoginPage();
          //Main.setContent(loginPage.drawLoginPage());
          loginPage.drawLoginPage();
        },
      },
      {
        path: `${pages.ABOUT_US}`,
        callback: (): void => {
          const aboutUs = new AboutUS();
          Main.setContent(aboutUs.drawAboutUs());
        },
      },
      {
        path: `${pages.NOT_FOUND}`,
        callback: (): void => {
          const notFound = new NotFound();
          Main.setContent(notFound.drawNotFound());
        },
      },
    ];
  }
}

export default App;
