import { changeLineItem } from '../api/cart/changeLineItem';
import { createMyCart } from '../api/cart/createMyCart';
import { Cart } from '../types/types';
import Header from './header';

export const toggleCatalogAddProductButton = async (target: HTMLElement): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const addButton = target.closest('.product__buttons') as HTMLDivElement;
  const id = addButton.parentElement ? addButton.parentElement.id : '';
  const buttonText = addButton.querySelector('.product__add-text') as HTMLSpanElement;
  const buttonIcon = addButton.querySelector('.product__add-button') as HTMLSpanElement;

  if (buttonText.innerText === 'add to cart') {
    await changeLineItem(id, 'add', 1);
    addButton.classList.remove('product__buttons_active');
    buttonIcon.innerText = '✓';

    Header.addProductsNumberInBasket();
  }
};
