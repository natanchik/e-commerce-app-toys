import Filters from '../components/filters';
import { createElement } from '../components/utils';
import { catalogQueryParams } from '../state/state';
import { Category, Price, Product } from '../types/types';

class Catalog {
  constructor() {
    localStorage.removeItem('search_products');
  }

  public async drawCatalog(): Promise<HTMLDivElement> {
    const catalog = createElement('div', ['catalog', 'main__wrapper']) as HTMLDivElement;
    const breadcrumbs = createElement(
      'ul',
      ['catalog__breadcrumbs'],
      '<li class="catalog__breadcrumb" data-page="catalog" >Catalog</li>',
    ) as HTMLDivElement;
    const content = createElement('div', ['catalog__content']) as HTMLDivElement;
    const products = createElement('div', ['catalog__products']) as HTMLDivElement;
    const mobileFiltersButton = createElement('div', ['mobile-filters__item'], 'Filters') as HTMLDivElement;
    const filters = await this.drawFilters();

    content.append(mobileFiltersButton, filters, products);
    catalog.append(breadcrumbs, content);

    return catalog;
  }

  private async drawFilters(): Promise<HTMLDivElement> {
    const filters = new Filters();

    return filters.drawFilters();
  }

  static async drawBreadcrumbs(): Promise<void> {
    const breadcrumbs = document.querySelector('.catalog__breadcrumbs') as HTMLUListElement;
    breadcrumbs.innerHTML = '<li class="catalog__breadcrumb" data-page="catalog" >Catalog</li>';

    if (catalogQueryParams.has('sidebar')) {
      const currentParamValue: string = catalogQueryParams.get('sidebar').value;
      const currentCategoryId: string = currentParamValue
        .replace('masterData%28current%28categories%28id%3D%22', '')
        .replace('%22%29%29%29', '');

      const categories: Category[] = localStorage.getItem('categories')
        ? JSON.parse(localStorage.getItem('categories') as string)
        : [];
      categories.forEach((category: Category) => {
        if (category.id === currentCategoryId) {
          if (category.parent) {
            categories.forEach((parentCategory: Category) => {
              if (parentCategory.id === category.parent.id) {
                const breadcrumbCurrent = createElement(
                  'li',
                  ['catalog__breadcrumb'],
                  parentCategory.name['ru-KZ'],
                ) as HTMLLIElement;
                breadcrumbCurrent.dataset.page = parentCategory.slug['ru-KZ'];
                breadcrumbCurrent.id = parentCategory.id;

                breadcrumbs.append(breadcrumbCurrent);
              }
            });
          }

          const breadcrumbCurrent = createElement(
            'li',
            ['catalog__breadcrumb'],
            category.name['ru-KZ'],
          ) as HTMLLIElement;
          breadcrumbCurrent.dataset.page = category.slug['ru-KZ'];
          breadcrumbCurrent.id = category.id;

          breadcrumbs.append(breadcrumbCurrent);
        }
      });
    }
  }

  static drawProducts(): void {
    const products = document.querySelector('.catalog__products') as HTMLDivElement;
    products.innerHTML = '';
    let currentProducts: Product[] = [];
    let searchProducts: Product[] = [];

    this.drawBreadcrumbs();

    if (
      localStorage.getItem('sorted_products') &&
      JSON.parse(localStorage.getItem('sorted_products') as string).length > 0
    ) {
      currentProducts = JSON.parse(localStorage.getItem('sorted_products') as string);
    } else if (catalogQueryParams.size > 0) {
      currentProducts = JSON.parse(localStorage.getItem('sorted_products') as string);
    } else {
      currentProducts = JSON.parse(localStorage.getItem('all_products') as string);
    }

    if (localStorage.getItem('search_products')) {
      searchProducts = JSON.parse(localStorage.getItem('search_products') as string);
      const searchProductsIds: string[] = [];

      searchProducts.forEach((product: Product): void => {
        searchProductsIds.push(product.id);
      });

      currentProducts = currentProducts.filter((product: Product): boolean => searchProductsIds.includes(product.id));
    }

    if (currentProducts && currentProducts.length > 0) {
      currentProducts.forEach((product: Product): void => {
        const productBlock = this.drawProduct(product);
        products.append(productBlock);
      });
    } else {
      products.innerHTML = 'Sorry, no products matched your selection.';
    }
  }

  static drawProduct(product: Product): HTMLDivElement {
    const productBlock = createElement('div', ['catalog__product', 'product']) as HTMLDivElement;
    const img = createElement('img', ['product__img']) as HTMLImageElement;
    const url: string = product.masterData.current.masterVariant.images[0].url;
    if (url) img.src = url;
    const name = createElement(
      'div',
      ['product__name'],
      `${product.masterData.current.name['en-US']}`,
    ) as HTMLDivElement;
    const description = createElement(
      'div',
      ['catalog__description'],
      `${product.masterData.current.description['en-US'].slice(0, 45)}...`,
    ) as HTMLDivElement;
    const prices = this.drawPrices(product);

    productBlock.id = product.id;
    //TODO проверка есть ли товар в коррзине -> add -> иначе delete
    const addProductBtns = createElement('div', ['product__buttons']) as HTMLDivElement;
    const addBtn = createElement('span', ['product__button', 'product__add-button'], '+') as HTMLSpanElement;
    const addText = createElement('span', ['product__button', 'product__add-text'], 'add to cart') as HTMLSpanElement;
    addProductBtns.append(addText, addBtn);
    
    productBlock.append(img, addProductBtns, name, description, prices);
    return productBlock;
  }

  static drawPrices(product: Product): HTMLDivElement {
    const prices = createElement('div', ['product__prices']) as HTMLDivElement;
    const priceValue = createElement('span', ['product__price']) as HTMLSpanElement;
    const discountValue = createElement('span', ['product__discount']) as HTMLSpanElement;
    let value: string;
    let discount: string;

    product.masterData.current.masterVariant.prices.forEach((price: Price): void => {
      if (price.country === 'US') {
        value = price.value.centAmount
          ? (price.value.centAmount / 10 ** price.value.fractionDigits).toFixed(2)
          : '0.00';
        priceValue.innerText = `${value} ${price.value.currencyCode}`;

        if (price.discounted) {
          discount = (price.discounted.value.centAmount / 10 ** price.discounted.value.fractionDigits).toFixed(2);
          priceValue.classList.add('product__price_crossed-out');
          discountValue.innerText = `${discount}`;
          prices.append(discountValue);
        }
      }
    });

    prices.append(priceValue);

    return prices;
  }

  static clearSortedProducts(): void {
    localStorage.removeItem('sorted_products');
    catalogQueryParams.clear();
  }
}

export default Catalog;
