import { changeLineItem } from '../api/cart/changeLineItem';
import { pages } from '../router/pages';
import Router from '../router/router';

export const changeCartItemQuantityFromCart = (
  target: HTMLElement,
  router: Router,
  action: 'add' | 'decrease' | 'remove' = 'add',
): void => {
  const itemsBtns = document.querySelectorAll<HTMLButtonElement>('button');
  itemsBtns.forEach((btn: HTMLButtonElement): void => {
    if (btn instanceof HTMLButtonElement) btn.disabled = true;
  });
  changeLineItem(target.dataset.id, action, 1).then(() => {
    router.navigate(pages.CART);
  });
  
};
