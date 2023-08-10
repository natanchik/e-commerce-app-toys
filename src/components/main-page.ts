import { createElement } from './utils';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement(
      'div',
      ['main-page', 'wrapper'],
      '<h2>Привет! Это главная страница</h2>',
    ) as HTMLDivElement;

    return mainPage;
  }

  private setEventListeners(): void {}
}

export default MainPage;
