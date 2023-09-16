import { changeLineItem } from '../api/cart/changeLineItem';
import { createMyCart } from '../api/cart/createMyCart';

export const toggleCatalogAddProductButton = async (target: HTMLElement): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const addButton = target.closest('.product__buttons') as HTMLDivElement;
  const id = addButton.parentElement ? addButton.parentElement.id : '';
  changeLineItem(id, 'add', 1);

  // const buttonText = target.closest('.product__add-text') as HTMLSpanElement;
  // const buttonIcon = target.closest('.product__add-button') as HTMLSpanElement;
  // console.log(addButton);
  // console.log(buttonText);
  // console.log(buttonIcon);
  // const id = addButton.parentElement ? addButton.parentElement.id : '';
  // if (buttonText.innerText !== 'add to cart') {
  //   changeLineItem(id, 'remove').then(() => {
  //     // buttonText.innerText = 'add to cart';
  //     // buttonIcon.innerText = '+';
  //   });
  // } else {
  //   changeLineItem(id, 'add', 1).then(() => {
  //     // buttonText.innerText = 'remove';
  //     // buttonIcon.innerText = '−';
  //   });
  // }
};
