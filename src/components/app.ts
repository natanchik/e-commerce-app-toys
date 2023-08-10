import pages from '../router/pages';
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
    this.router = new Router();
    this.header = new Header(this.router);
    this.main = new Main();
    this.footer = new Footer(this.router);
  }

  public startApp(): void {
    this.router.navigate(pages.MAIN);
  }
}

export default App;
