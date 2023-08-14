import pages from './router/pages';
import { RouteInfo } from './types/types';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import NotFound from './pages/not-found';
import AboutUS from './pages/about-us';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Router from './router/router';
import Contacts from './pages/contacts';
import Terms from './pages/terms-conditions';

class App {
  router: Router;

  header: Header;

  main: Main;

  footer: Footer;

  constructor() {
    this.router = new Router(this.createRoutes());
    this.header = new Header(this.router);
    this.main = new Main(this.router);
    this.footer = new Footer(this.router);
  }

  public startApp(): void {}

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
        path: `${pages.LOGIN}`,
        callback: (): void => {
          const loginPage = new LoginPage();
          //Main.setContent(loginPage.drawLoginPage()); DOTO: refactor aotorization page draw metod - to return HTMLDiv Element
          loginPage.drawLoginPage();
        },
      },
      {
        path: `${pages.REGISTRATION}`,
        callback: (): void => {
          const loginPage = new LoginPage();
          //Main.setContent(loginPage.drawLoginPage()); DOTO: refactor aotorization page draw metod - to return HTMLDiv Element
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
        path: `${pages.CONTACTS}`,
        callback: (): void => {
          const contacts = new Contacts();
          Main.setContent(contacts.drawContacts());
        },
      },
      {
        path: `${pages.TERMS_AND_CONDITIONS}`,
        callback: (): void => {
          const terms = new Terms();
          Main.setContent(terms.drawTerms());
        },
      },
      {
        path: `${pages.NOT_FOUND}`,
        callback: (): void => {
          const notFound = new NotFound(this.router);
          Main.setContent(notFound.drawNotFound());
        },
      },
    ];
  }
}

export default App;
