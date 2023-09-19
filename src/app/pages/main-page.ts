import { createElement } from '../components/utils';
import Slider from '../components/slider';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement('div', ['main-page', 'main__wrapper']) as HTMLDivElement;
    const promos = this.drawPromoContainer();

    mainPage.append(promos);
    return mainPage;
  }

  private drawPromoContainer(): HTMLDivElement {
    const promoContainer = createElement('div', ['main-page__promo', 'promo__container']) as HTMLDivElement;
    new Slider();

    return promoContainer;
  }

  private async drawCategoriesGrid(): Promise<HTMLDivElement> {
    const categoriesGrid = createElement('div', ['main-page__catgories']) as HTMLDivElement;

    return categoriesGrid;
  }
}

export default MainPage;
