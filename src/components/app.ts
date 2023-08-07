import { createElement } from './utils';
import Header from './header';
import MainPage from './mainPage';
import Footer from './footer';
import { LoginPage } from './autorization';

class App {
  startApp(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = createElement('div', ['main']) as HTMLDivElement;
    const wrapper = createElement('div', ['wrapper', 'main__wrapper']) as HTMLDivElement;

    const header = new Header();
    const mainPage = new MainPage();
    const footer = new Footer();

    header.drawHeader();
    mainPage.drawMainPage();

    main.append(wrapper);
    body.append(main);

    footer.drawFooter();

    const iconUser = document.querySelector('.header__icon-user');
    iconUser?.addEventListener('click', function addLoginPage() {
      const login = new LoginPage();
      login.drawLoginPage();
    });
  }
}

export default App;
