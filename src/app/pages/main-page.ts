import { createElement } from '../components/utils';
import { pages } from '../router/pages';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement('div', ['main-page', 'main__wrapper'], '<h2>Main page:</h2>') as HTMLDivElement;
    const pagesBlock = this.addPages();

    mainPage.append(pagesBlock);
    return mainPage;
  }

  private addPages(): HTMLDivElement {
    const pagesBlock = createElement('div', ['main-page__pages-list']) as HTMLDivElement;
    Object.values(pages).forEach((page) => {
      const pageBlock = createElement('div', ['main-page__page'], page === '' ? 'main' : page) as HTMLDivElement;
      pageBlock.dataset.page = page;
      if (page === 'catalog') {
        const note = createElement(
          'p',
          ['main-page__pagen-note', 'main__green-text'],
          'note: you can choose the category you need in burger menu',
        );
        pageBlock.append(note);
      }
      pagesBlock.append(pageBlock);
    });
    return pagesBlock;
  }
}

export default MainPage;
