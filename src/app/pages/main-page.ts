import { createElement } from '../components/utils';
import { promoCodes } from '../components/constants';

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement('div', ['main-page', 'main__wrapper']) as HTMLDivElement;
    const promos = this.drawPromoContainer();

    mainPage.append(promos);
    return mainPage;
  }

  private drawPromoContainer(): HTMLDivElement {
    const promoContainer = createElement('div', ['promo__container']) as HTMLDivElement;
    promoCodes.forEach((promocode, idx) => {
      const item = this.drawPromo(promocode, idx);
      promoContainer.append(item);
    });

    return promoContainer;
  }

  private drawPromo(promocode: { [key: string]: string }, idx: number): HTMLDivElement {
    const promo = createElement('div', ['promo__item', `promo__item-${idx}`]) as HTMLDivElement;
    const img = createElement('div', ['promo__img', `promo__img-${idx}`]);
    const promoInfo = createElement('div', ['promo__info-block']);
    const promoHeading = createElement('div', ['promo__info-heading'], `${promocode.discount} OFF`);
    const promoText = createElement(
      'div',
      ['promo__info-text'],
      `Use Code: <span>${promocode.promocode}</span> at your cart.${
        promocode.promocode === 'BABY' ? '<div>Only for Baby Toys: 0-12 Months</div>' : ''
      }`,
    );
    const promoBtn = createElement('div', ['promo__btn-to-catalog', 'button'], 'Shop Now');

    promoInfo.append(promoHeading, promoText, promoBtn);
    promo.append(img, promoInfo);
    return promo;
  }
}

export default MainPage;
