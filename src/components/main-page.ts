import { createElement } from './utils';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement(
      'div',
      ['main-page', 'main__wrapper'],
      '<h2>Main page content well be here soon...</h2>',
    ) as HTMLDivElement;

    return mainPage;
  }

  private setEventListeners(): void {}
}

export default MainPage;
