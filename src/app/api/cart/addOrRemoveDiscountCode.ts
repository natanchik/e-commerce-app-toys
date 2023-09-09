import { discountID } from '../../components/constants'; // это единственный промокод в проекте

const cartForTest = 'e4f384c9-06d2-4300-8e11-213a1800dd07';

export const addOrRemoveDiscountCode = async (
  code: string,
  action: 'add' | 'remove' = 'add',
  cartId = cartForTest,
  discount = discountID,
): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const currentBody: { version: number; actions: object[] } = {
    version: JSON.parse(localStorage.cart) ? JSON.parse(localStorage.cart).version : 1,
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
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts/${cartId}`,
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
    });
};
