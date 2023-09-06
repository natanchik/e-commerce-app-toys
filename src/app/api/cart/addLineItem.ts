import User from '../../components/user';

// const productForTest = '1f64c46d-652f-45c4-925b-eaaf68c70889';
// const cartForTest = 'e4f384c9-06d2-4300-8e11-213a1800dd07';

export const addLineItem = async (productId: string, quantity: number, cartId: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      User.isLogged()
        ? JSON.parse(localStorage.token_info).access_token
        : JSON.parse(localStorage.anonymous_token).access_token
    }`,
  };

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      // нужно как в профиле сохранять cart в localStorage, чтобы брать оттуда актуальную версию корзины и в теле ее динамически менять
      version: 10,
      actions: [
        {
          action: 'addLineItem',
          productId: `${productId}`,
          variantId: 1,
          quantity: quantity,
          // здесь id нашей единственной tax-category
          externalTaxRate: 'bf2a4dc1-dd08-4b29-9b16-efbd7b905a42',
        },
      ],
    }),
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/carts/${cartId}`,
    requestOptions,
  ).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw new Error(`The error with status code ${res.status} has occured, please try later`);
    }
  });
  // .then((res) => console.log(res));
};
