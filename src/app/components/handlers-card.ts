import { changeLineItem } from '../api/cart/changeLineItem';
import { createMyCart } from '../api/cart/createMyCart';
import { pages } from '../router/pages';
import Router from '../router/router';

const getId = async (target: HTMLElement): Promise<string | undefined> => {
  const form = target.closest('.product-card__form') as HTMLElement;
  return form ? form.dataset.id : '';
};

export const toggleCardAddProductButton = async (target: HTMLElement, router: Router): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const id = await getId(target);

  if (target.textContent !== 'add to cart') {
    changeLineItem(id, 'remove').then(() => {
      target.innerText = 'add to cart';
      target.classList.add('button_green');
      router.navigate(`${pages.CATALOG}/${id}`);
    });
  } else {
    changeLineItem(id, 'add', 1).then(() => {
      target.innerText = 'remove from cart';
      target.classList.remove('button_green');
      router.navigate(`${pages.CATALOG}/${id}`);
    });
  }
};

export const changeCartItemQuantityFromCard = async (
  target: HTMLElement,
  router: Router,
  action: 'add' | 'decrease',
): Promise<void> => {
  if (!localStorage.cart) await createMyCart();
  const id = await getId(target);

  changeLineItem(id, action, 1).then(() => {
    router.navigate(`${pages.CATALOG}/${id}`);
  });
};
