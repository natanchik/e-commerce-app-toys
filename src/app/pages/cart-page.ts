import { LineItem } from '../types/types';
import { createElement } from '../components/utils';

export default class CartPage {
  public drawCart(): HTMLDivElement {
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : '';

    const cartPage = createElement('div', ['cart', 'main__wrapper']) as HTMLDivElement;
    const cartTitle = createElement('h3', ['cart__title'], 'Cart');
    const cartGrid = createElement('div', ['cart__list']) as HTMLUListElement;
    const emptyCartMessage = createElement(
      'div',
      ['cart__is-empty-message', 'cart__hidden'],
      '<p>Cart is empty.</p><p>You can visit <a class="cart__link-to-catalog" href="">Catalog</a> to add products to it...</p>',
    );

    if (cart) {
      const products: LineItem[] = cart.lineItems;
      if (products.length) {
        emptyCartMessage.className = 'cart__is-empty-message cart__hidden';
        products.forEach((product, ind) => {
          this.addCartItem(product, ind, cartGrid);
        });
        const emptyBlock = createElement('div', ['cart__item']);
        const totalSumTitle = createElement('div', ['cart__item', 'cart__sum-title'], 'Total sum');
        const totalSum = createElement(
          'div',
          ['cart__item', 'cart__sum'],
          `${(cart.totalPrice.centAmount / 100).toFixed(2)}`,
        );
        cartGrid.append(emptyBlock, totalSumTitle, totalSum);
      } else {
        emptyCartMessage.className = 'cart__is-empty-message';
      }
    } else {
      emptyCartMessage.className = 'cart__is-empty-message';
    }

    const warning = createElement('div', ['cart__warning']);
    cartPage.append(cartTitle, emptyCartMessage, warning, cartGrid);
    return cartPage;
  }

  private addCartItem(lineitem: LineItem, index: number, cartList: HTMLUListElement): void {
    const itemIndex = createElement('div', ['cart__item', 'cart__item__index'], `${index + 1}`);

    const itemImgBlock = createElement('div', ['cart__item', 'cart__item__img-block']);
    const itemImg = createElement('div', ['cart__item__img']);
    itemImg.style.backgroundImage = `url(${lineitem.variant.images[0].url})`;
    itemImgBlock.append(itemImg);

    const itemTitle = createElement('div', ['cart__item', 'cart__item__title'], lineitem.name['en-US']);

    const itemPrice = createElement('div', ['cart__item', 'cart__item__price']);
    const itemTotalPrice = createElement(
      'div',
      ['cart__item', 'cart__item__price'],
      `<p>${(lineitem.totalPrice.centAmount / 100).toFixed(2)}</p>`,
    );
    const fullPrice = createElement('p', [], `${(lineitem.price.value.centAmount / 100).toFixed(2)}`);
    if (lineitem.price.discounted) {
      fullPrice.classList.add('cart__item__price-full');
      const discountPrice = createElement('p', [], `${(lineitem.price.discounted.value.centAmount / 100).toFixed(2)}`);
      const oldTotalPrice = createElement(
        'p',
        ['cart__item__price-full'],
        `${((lineitem.price.value.centAmount / 100) * lineitem.quantity).toFixed(2)}`,
      );
      itemPrice.append(discountPrice);
      itemTotalPrice.append(oldTotalPrice);
    }
    itemPrice.append(fullPrice);

    const itemAmounts = createElement('div', ['cart__item', 'cart__item__amount']);
    const amountBlock = createElement('div', ['cart__item__amount-block']);
    const plusBtn = createElement('button', ['cart__btn__plus'], '+');
    plusBtn.id = `plus${lineitem.productId}`;
    const amountTablo = createElement('div', ['cart__item__amount-value'], `${lineitem.quantity}`);
    const minusBtn = createElement('button', ['cart__btn__minus'], '-');
    minusBtn.id = `minus${lineitem.id}`;
    const itemDelete = createElement('div', ['cart__btn__delete']);
    itemDelete.id = `delete${lineitem.id}`;
    amountBlock.append(minusBtn, amountTablo, plusBtn);
    itemAmounts.append(amountBlock, itemDelete);

    cartList.append(itemIndex, itemImgBlock, itemTitle, itemPrice, itemAmounts, itemTotalPrice);
  }
}
