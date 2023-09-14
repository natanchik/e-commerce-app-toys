import { createElement } from '../components/utils';
// import { pages } from '../router/pages';

const promoCodes: { [key: string]: string }[] = [
  { discount: '25%', promocode: 'BABY' },
  { discount: '10%', promocode: 'FALL' },
];

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
      `Use Code: <span class="">${promocode.promocode}</span> at your cart`,
    );
    const promoBtn = createElement('div', ['promo__btn-to-catalog', 'button'], 'Shop Now');

    promoInfo.append(promoHeading, promoText, promoBtn);
    promo.append(img, promoInfo);
    return promo;
  }
}

export default MainPage;
