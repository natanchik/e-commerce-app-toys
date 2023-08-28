import getAllProducts from '../api/getProduct/getAllProducts';
import { createElement } from '../components/utils';
import { Price, Product } from '../types/types';

class Catalog {
  constructor() {
    getAllProducts();
  }

  public drawCatalog(): HTMLDivElement {
    const catalog = createElement('div', ['catalog', 'main__wrapper']) as HTMLDivElement;
    const title = createElement('div', ['catalog__title'], '<h2>Catalog</h2>') as HTMLDivElement;
    const content = createElement('div', ['catalog__content']) as HTMLDivElement;
    const filters = this.drawFilters();
    const products = this.drawProducts();

    content.append(filters, products);
    catalog.append(title, content);
    return catalog;
  }

  private drawFilters(): HTMLDivElement {
    const filters = createElement('div', ['catalog__filters']) as HTMLDivElement;

    return filters;
  }

  private drawProducts(): HTMLDivElement {
    const products = createElement('div', ['catalog__products']) as HTMLDivElement;
    const allProducts: Product[] = localStorage.getItem('product_info')
      ? JSON.parse(localStorage.getItem('product_info') as string)
      : [];

    allProducts.forEach((product: Product): void => {
      const productBlock = this.drawProduct(product);
      products.append(productBlock);
    });

    return products;
  }

  private drawProduct(product: Product): HTMLDivElement {
    console.log(product);
    const productBlock = createElement('div', ['catalog__product', 'product']) as HTMLDivElement; 
    const img = createElement('img', ['product__img']) as HTMLImageElement;
    const url: string = product.masterData.current.masterVariant.images[0].url;
    if (url) img.src = url;
    const name = createElement('div', ['product__name'], `${product.masterData.current.name['en-US']}`) as HTMLDivElement;
    const prices = this.drawPrices(product);

    productBlock.append(img, name, prices);
    return productBlock;
  }

  private drawPrices(product: Product): HTMLDivElement {
    const prices = createElement('div', ['product__prices']) as HTMLDivElement;
    const priceValue = createElement('span', ['product__price']) as HTMLSpanElement;
    const discountValue = createElement('span', ['product__discount']) as HTMLSpanElement;
    let value: string;
    let discount: string;

    product.masterData.current.masterVariant.prices.forEach((price: Price): void => {
      if(price.country === 'US') {
         value = (price.value.centAmount) ? (price.value.centAmount / (10 * price.value.fractionDigits)).toFixed(2) : '0.00';
         priceValue.innerText = `${value} ${price.value.currencyCode}`;

         if (price.discounted) {
          discount = (price.discounted.value.centAmount / (10 * price.discounted.value.fractionDigits)).toFixed(2);
          priceValue.classList.add('product__price_crossed-out');
          discountValue.innerText = `${discount}`;
          prices.append(discountValue);
        }
      }
    })
    
    prices.append(priceValue);

    return prices;
  }
}

export default Catalog;
