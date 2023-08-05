import Header from './header';

class App {
  startApp(): void {
    const header = new Header();

    header.drawHeader();
  }
}

export default App;
