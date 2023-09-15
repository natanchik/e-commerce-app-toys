import { discountID } from '../../components/constants';
import { showWarning } from '../../components/handlers';

export const changeDiscountCode = async (
  code: string,
  action: 'add' | 'remove' = 'add',
  discount = discountID,
): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const cart = JSON.parse(localStorage.cart);
  const currentBody: { version: number; actions: object[] } = {
    version: cart ? cart.version : 1,
    actions: [],
  };

  if (action === 'add') {
    currentBody.actions.push({
      action: 'addDiscountCode',
      code: code,
    });
  } else {
    currentBody.actions.push({
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discount,
      },
    });
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(currentBody),
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts/${cart.id}`,
    requestOptions,
  )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      localStorage.setItem('cart', JSON.stringify(res));
    })
    .catch((err) => {
      if (err instanceof Error) {
        showWarning('error', err.message, 'cart');
      }
    });
};
