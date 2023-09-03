const productID = '129ae40f-9c4f-49b7-a5ca-2aba067d8c7b';

// TODO прокидывать id в параметры функции
const getProductByID = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/products/${productID}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      // TODO сохранять в локал только нужную для карточки инфо или нужен весь объект?
      localStorage.setItem('full-product-info', JSON.stringify(result));
      localStorage.setItem(
        'product-info',
        JSON.stringify({
          title: result.masterData.staged.name['ru-KZ'],
          images: [...result.masterData.staged.masterVariant.images],
          prices: {
            value: (result.masterData.staged.masterVariant.prices[0].value.centAmount / 100).toFixed(2),
            discounted: (result.masterData.staged.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2),
            currency: result.masterData.staged.masterVariant.prices[0].value.currencyCode,
          },
          details: result.masterData.staged.description['en-US'],
        }),
      );
    })
    .catch((error) => {
      if (error) localStorage.setItem('error_getproduct-by-id', error.message);
      alert('Sorry, this is taking an unusually long time...');
    });
};

export default getProductByID;
