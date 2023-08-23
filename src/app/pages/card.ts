import { createElement, createImageElement } from '../components/utils';
import { CardData } from '../types/types';

class Card {
  data: CardData;

  constructor(data: CardData) {
    this.data = data;
  }

  public drawCard(): HTMLDivElement {
    const wrapper = createElement('div', ['product-card', 'main__wrapper']) as HTMLDivElement;
    const slider = this.drawSlider();
    const info = createElement('div', ['product-card__info']) as HTMLDivElement;
    const heading = createElement('h2', ['product-card__heading'], this.data.title) as HTMLElement;
    const priceWrapper = this.drawPriceWrapper();
    // const form = this.drawCartForm();
    const smallHeading = createElement('h4', ['product-card__detail-heading'], 'Details') as HTMLElement;
    const details = createElement('p', ['product-card__details'], this.data.details) as HTMLParagraphElement;

    info.append(heading, priceWrapper, smallHeading, details);
    wrapper.append(slider, info);

    return wrapper;
  }

  private drawSlider(): HTMLDivElement {
    const container = createElement('div', ['product-card__slider-container']) as HTMLDivElement;
    const nextBtn = createElement('span', ['product-card__next-slide'], '&#10095');
    const prevBtn = createElement('span', ['product-card__prev-slide'], '&#10094');
    const slidesContainer = createElement('div', ['product-card__slider']) as HTMLDivElement;
    const slidesRow = createElement('div', ['product-card__slides-row']);
    const minisRow = createElement('div', ['product-card__minis-row']);
    this.data.images.map((imageData) => {
      const slide = createElement('div', ['product-card__slide']);
      const currentImg = createImageElement(imageData.url, ['product-card__slide-img'], { width: '400' });
      const mini = createElement('div', ['product-card__mini']);
      const miniImg = createImageElement(imageData.url, ['product-card__mini-img'], { width: '50' });

      slide.append(currentImg);
      mini.append(miniImg);
      slidesRow.append(slide);
      minisRow.append(mini);
    });

    slidesContainer.append(slidesRow, minisRow);
    container.append(prevBtn, slidesContainer, nextBtn);

    return container;
  }

  private drawPriceWrapper(): HTMLDivElement {
    const priceWrapper = createElement('div', ['product-card__price-wrapper']) as HTMLDivElement;
    if (this.data.prices.discounted) {
      const discountedPrice = createElement(
        'span',
        ['product-card__discounted-price'],
        `${this.data.prices.discounted}${this.data.prices.currency} `,
      ) as HTMLSpanElement;
      priceWrapper.append(discountedPrice);
    }
    const price = createElement(
      'span',
      ['product-card__price', `${this.data.prices.discounted ? 'product-card__old-price' : ''}`],
      `${this.data.prices.value}${this.data.prices.currency}`,
    ) as HTMLSpanElement;
    priceWrapper.append(price);

    return priceWrapper;
  }

  private drawCartForm(): HTMLFormElement {
    const form = createElement('form', ['product-card__form']) as HTMLFormElement;
    const quantityWrapper = createElement('div', ['product-card__quantity-wrapper']) as HTMLDivElement;
    const decreaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '-',
    ) as HTMLButtonElement;
    const quantity = createElement('input', ['product-card__quantity']) as HTMLInputElement;
    quantity.type = 'number';
    quantity.placeholder = '1';
    quantity.min = '0';
    quantity.value = '1';
    const increaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '+',
    ) as HTMLButtonElement;
    const addToCart = createElement('button', ['product-card__add-to-cart'], 'Add to cart') as HTMLButtonElement;

    quantityWrapper.append(decreaseQuanity, quantity, increaseQuanity);
    form.append(quantityWrapper, addToCart);

    return form;
  }
}

export default Card;
