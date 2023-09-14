import { createElement } from '../components/utils';
// import { pages } from '../router/pages';

const promoCodes: { [key: string]: string }[] = [
  { discount: '25%', promocode: 'BABY' },
  { discount: '10%', promocode: 'FALL' },
];

class MainPage {
  public drawMainPage(): HTMLDivElement {
    const mainPage = createElement('div', ['main-page', 'main__wrapper']) as HTMLDivElement;
    const promos = this.drawPromosSlider();

    mainPage.append(promos);
    return mainPage;
  }

  private drawPromosSlider(): HTMLDivElement {
    // const pagesBlock = createElement('div', ['main-page__pages-list']) as HTMLDivElement;
    // Object.values(pages).forEach((page) => {
    //   const pageBlock = createElement('div', ['main-page__page'], page === '' ? 'main' : page) as HTMLDivElement;
    //   pageBlock.dataset.page = page;
    //   if (page === 'catalog') {
    //     const note = createElement(
    //       'p',
    //       ['main-page__pagen-note', 'main__green-text'],
    //       'note: you can choose the category you need in burger menu',
    //     );
    //     pageBlock.append(note);
    //   }
    //   pagesBlock.append(pageBlock);
    // });
    // return pagesBlock;
    const promoWrapper = createElement('div', ['promo-wrapper']) as HTMLDivElement;
    // const nextBtn = createElement('span', ['promo__next-slide'], '&#10095') as HTMLSpanElement;
    // const prevBtn = createElement('span', ['promo__prev-slide'], '&#10094') as HTMLSpanElement;
    const slidesContainer = createElement('div', ['promo__slider']) as HTMLDivElement;
    promoCodes.forEach((promocode, idx) => {
      const slide = this.drawPromo(promocode, idx);
      slidesContainer.append(slide);
    });

    promoWrapper.append(slidesContainer);

    return promoWrapper;
  }

  private drawPromo(promocode: { [key: string]: string }, idx: number): HTMLDivElement {
    const promo = createElement('div', ['promo__slide', `promo__slide-${idx}`]) as HTMLDivElement;
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
