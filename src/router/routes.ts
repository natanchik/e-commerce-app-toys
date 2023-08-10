import { RouteInfo } from '../types/types';
import pages from '../router/pages';
import MainPage from '../components/main-page';
import LoginPage from '../components/autorization';
import NotFound from '../components/not-found';
import AboutUS from '../components/about-us';
import Main from '../components/main';

const routes: RouteInfo[] = [
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

export default routes;
