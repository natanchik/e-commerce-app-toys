import Header from './header';
import MainPage from './mainPage';

class App {
  startApp(): void {
    const header = new Header();
    const mainPage = new MainPage();

    header.drawHeader();
    mainPage.drawMainPage();
  }
}

export default App;
