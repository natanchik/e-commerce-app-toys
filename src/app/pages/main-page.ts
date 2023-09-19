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
    const promoContainer = createElement('div', ['promo__container']) as HTMLDivElement;
    new Slider();

    return promoContainer;
  }
}

export default MainPage;
