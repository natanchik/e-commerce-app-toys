import { createElement } from '../components/utils';
import pages from '../router/pages';

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
      pagesBlock.append(pageBlock);
    });
    return pagesBlock;
  }
}

export default MainPage;
