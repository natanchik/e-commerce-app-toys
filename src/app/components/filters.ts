import getCategories from '../api/category/getCategories';
import getProductsTypes from '../api/types/getProductsTypes';
import { catalogQueryParams } from '../state/state';
import { Category, ProductType } from '../types/types';
import { sorterParametrs } from './constants';
import { createCheckBoxElement, createElement, createInputElement } from './utils';

class Filters {
  public drawFilters(): HTMLDivElement {
    const filters = createElement('div', [
      'catalog__filters',
      'filters',
      'mobile-filters__content_hidden',
    ]) as HTMLDivElement;
    filters.dataset.content = 'mobile-filters';

    this.drawSearch(filters);
    this.drawSort(filters);
    this.drawPriceFilter(filters);
    this.drawByCategoryFilter(filters);
    this.drawByTypeFilter(filters);
    this.drawResetButton(filters);

    return filters;
  }

  private drawByCategoryFilter(filters: HTMLDivElement): void {
    getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]);
    const topCategories: Category[] = localStorage.getItem('top_categories')
      ? JSON.parse(localStorage.getItem('top_categories') as string)
      : [];

    topCategories.forEach((category: Category): void => {
      const name = category.name['en-US'].toLocaleLowerCase();
      const slug = category.slug['en-US'];

      if (slug !== 'indoor' && slug !== 'outdoor') {
        const filter = createElement('div', ['filters__item'], `${name}`) as HTMLDivElement;
        const filterContent = createElement('div', ['filters__content', 'filters__content_hidden']) as HTMLDivElement;
        filter.id = slug;
        filterContent.dataset.content = slug;

        getCategories(`${name}`, [{ key: 'where', value: `parent%28id%3D%22${category.id}%22%29` }]);
        const currentCategories: Category[] = localStorage.getItem(`${name}_categories`)
          ? JSON.parse(localStorage.getItem(`${name}_categories`) as string)
          : [];

        currentCategories.forEach((currentCategory: Category): void => {
          const currentCheckbox = createCheckBoxElement(
            currentCategory.name['en-US'],
            currentCategory.id,
            false,
            'filters',
            slug,
          );
          filterContent.append(currentCheckbox);
        });

        filters.append(filter, filterContent);
      }
    });
  }

  private drawByTypeFilter(filters: HTMLDivElement): void {
    const filterByType = createElement('div', ['filters__item'], 'Product type') as HTMLDivElement;
    const filterByTypeList = createElement('div', ['filters__content', 'filters__content_hidden']) as HTMLDivElement;
    filterByType.id = 'types';
    filterByTypeList.dataset.content = 'types';

    getProductsTypes();
    const allTypes: ProductType[] = localStorage.getItem('products_types')
      ? JSON.parse(localStorage.getItem('products_types') as string)
      : [];

    allTypes.forEach((type: ProductType): void => {
      const currentCheckbox = createCheckBoxElement(type.name, type.id, false, 'filters', 'product-type');
      filterByTypeList.append(currentCheckbox);
    });

    filters.append(filterByType, filterByTypeList);
  }

  private drawPriceFilter(filters: HTMLDivElement): void {
    const filterByPrice = createElement('div', ['filters__item'], 'Price') as HTMLDivElement;
    const filterByPriceList = createElement('div', ['filters__content', 'filters__content_hidden']) as HTMLDivElement;
    filterByPrice.id = 'price';
    filterByPriceList.dataset.content = 'price';

    const prices = createElement('div', ['filters__prices']) as HTMLDivElement;
    const from = createInputElement(
      'text',
      'from',
      'price-from',
      'filters__price',
      false,
      {},
      false,
    ) as HTMLInputElement;
    const to = createInputElement('text', 'to', 'price-to', 'filters__price', false, {}, false) as HTMLInputElement;
    const close = createElement(
      'p',
      ['filters__close', 'filters__close_prices', 'filters__close_hidden'],
      '&times;',
    ) as HTMLParagraphElement;
    from.classList.add('filters__price-input_from');
    to.classList.add('filters__price-input_to');

    const apply = createElement(
      'p',
      ['filters__apply', 'filters__apply_prices'],
      'apply filter',
    ) as HTMLParagraphElement;
    prices.append(from, to, close);
    filterByPriceList.append(prices, apply);
    filters.append(filterByPrice, filterByPriceList);
  }

  private drawSort(filters: HTMLDivElement): void {
    const sort = createElement('select', ['filters__select']) as HTMLSelectElement;
    Object.entries(sorterParametrs).forEach(([key, value]: [string, string]): void => {
      const option = createElement('option', ['filters__option'], value) as HTMLOptionElement;
      option.value = key;
      sort.append(option);
    });

    filters.append(sort);
  }

  private drawSearch(filters: HTMLDivElement): void {
    const searchBlock = createElement('div', ['filters__search-block']) as HTMLDivElement;
    const search = createElement('input', ['filters__search']) as HTMLInputElement;
    const close = createElement(
      'p',
      ['filters__close', 'filters__close_search', 'filters__close_hidden'],
      '&times;',
    ) as HTMLParagraphElement;
    search.setAttribute('placeholder', '. . . search');
    search.type = 'text';

    searchBlock.append(search, close);
    filters.append(searchBlock);
  }

  private drawResetButton(filters: HTMLDivElement): void {
    const button = createElement(
      'button',
      ['filters__button', 'button', 'button_blue'],
      'Reset all',
    ) as HTMLButtonElement;

    filters.append(button);
  }

  static resetAllFilters(): void {
    const allCheckbox = document.querySelectorAll<HTMLInputElement>('.filters__checkbox');
    allCheckbox.forEach((checkbox) => (checkbox.checked = false));

    const prices = document.querySelectorAll<HTMLInputElement>('.filters__price-input');
    prices.forEach((inputPrice) => (inputPrice.value = ''));

    const sort = document.querySelector('.filters__select') as HTMLSelectElement;
    sort.value = '';
    Object.keys(sorterParametrs).forEach((key: string) => {
      catalogQueryParams.delete(key);
    });

    const search = document.querySelector('.filters__search') as HTMLInputElement;
    search.value = '';
    localStorage.removeItem('search_products');

    localStorage.removeItem('sorted_products');
    catalogQueryParams.clear();
  }
}

export default Filters;
