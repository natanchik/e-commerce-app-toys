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
import Contacts from './contacts';
import Terms from './terms-conditions';

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
          const notFound = new NotFound();
          Main.setContent(notFound.drawNotFound());
        },
      },
    ];
  }
}

export default App;
