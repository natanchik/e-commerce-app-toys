import { createElement } from './utils';

class Card {
  public drawCard(): Node {
    const wrapper = createElement('div', ['product-card__wrapper']) as HTMLDivElement;
    const img = createElement('div', ['product-card__img']) as HTMLDivElement;
    const info = createElement('div', ['product-card__info']) as HTMLDivElement;
    const heading = createElement(
      'h2',
      ['product-card__heading'],
      'Little Dutch Cutting Fruit Set',
    ) as HTMLElement;
    const price = createElement('p', ['product-card__price'], '£15.00') as HTMLParagraphElement;
    const form = this.drawCartForm();
    const smallHeading = createElement(
      'h4',
      ['product-card__small-heading'],
      'Details',
    ) as HTMLElement;
    const details = createElement(
      'p',
      ['product-card__details'],
      'This beautiful wooden cutting fruit set from our favourites at Little dutch is the perfect gift on its own or with one of our Kitchen sets. <br> Complete with a wooden chopping board and knife, each fruit can be safely chopped in half - for hours of food prep fun! The pieces re connect easily thanks to the sturdy velcro fastening. <br> Each toy is lovingly painted and crafted from natural wood of the highest quality,  all sustainably and responsibly sourced.',
    ) as HTMLParagraphElement;

    info.append(heading, price, form, smallHeading, details);
    wrapper.append(img, info);

    return wrapper as Node;
  }

  private drawCartForm(): HTMLFormElement {
    const form = createElement('form', ['product-card__form']) as HTMLFormElement;
    const quantityWrapper = createElement('div', [
      'product-card__quantity-wrapper',
    ]) as HTMLDivElement;
    const decreaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '-',
    ) as HTMLButtonElement;
    const quantity = createElement('input', ['product-card__quantity']) as HTMLInputElement;
    quantity.type = 'number';
    quantity.min = '0';
    quantity.value = '1';
    const increaseQuanity = createElement(
      'button',
      ['product-card__decrease-quantity', 'quantity-btn'],
      '+',
    ) as HTMLButtonElement;
    const addToCart = createElement(
      'button',
      ['product-card__add-to-cart'],
      'Add to cart',
    ) as HTMLButtonElement;

    quantityWrapper.append(decreaseQuanity, quantity, increaseQuanity);
    form.append(quantityWrapper, addToCart);

    return form;
  }
}

export default Card;
