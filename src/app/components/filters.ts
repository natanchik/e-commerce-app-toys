import getCategories from '../api/category/getCategories';
import getProductsTypes from '../api/types/getProductsTypes';
import { Category, PriceFilterValue, ProductType } from '../types/types';
import { priceFilterValues } from './constants';
import { createCheckBoxElement, createElement } from './utils';

class Filters {
  public drawFilters(): HTMLDivElement {
    const filters = createElement('div', ['catalog__filters', 'filters']) as HTMLDivElement;
    this.drawPriceFilter(filters);

    getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]);
    const topCategories: Category[] = localStorage.getItem('top_categories')
      ? JSON.parse(localStorage.getItem('top_categories') as string)
      : [];

    topCategories.forEach((category: Category): void => {
      const name = category.name['en-US'].toLocaleLowerCase();
      const filter = createElement('div', ['filters__filter-name'], `<h4>${name}</h4>`) as HTMLDivElement;
      const filterContent = createElement('div', ['filters__filter-list', 'filters__filter-list_hidden']) as HTMLDivElement;

      getCategories(`${name}`, [{ key: 'where', value: `parent%28id%3D%22${category.id}%22%29` }]);
      const currentCategories: Category[] = localStorage.getItem(`${name}_categories`)
        ? JSON.parse(localStorage.getItem(`${name}_categories`) as string)
        : [];

      currentCategories.forEach((currentCategory: Category): void => {
        const currentCheckbox = createCheckBoxElement(currentCategory.name['en-US'], currentCategory.id, false);
        filterContent.append(currentCheckbox);
      });

      filters.append(filter, filterContent);
    });

    this.drawByTypeFilter(filters);

    return filters;
  }

  private drawByTypeFilter(filters: HTMLDivElement): void {
    const filterByType = createElement('div', ['filters__filter-name'], '<h4>Product type</h4>') as HTMLDivElement;
    const filterByTypeList = createElement('div', ['filters__filter-list', 'filters__filter-list_hidden']) as HTMLDivElement;

    getProductsTypes();
    const allTypes: ProductType[] = localStorage.getItem('products_types')
      ? JSON.parse(localStorage.getItem('products_types') as string)
      : [];

    allTypes.forEach((type: ProductType): void => {
      const currentCheckbox = createCheckBoxElement(type.name, type.id, false);
      filterByTypeList.append(currentCheckbox);
    });

    filters.append(filterByType, filterByTypeList);
  }

  private drawPriceFilter(filters: HTMLDivElement): void {
    const filterByPrice = createElement('div', ['filters__filter-name'], '<h4>Price</h4>') as HTMLDivElement;
    const filterByPriceList = createElement('div', ['filters__filter-list', 'filters__filter-list_hidden']) as HTMLDivElement;
    priceFilterValues.forEach((priceFilterValue: PriceFilterValue): void => {
      const currentCheckbox = createCheckBoxElement(priceFilterValue.value, priceFilterValue.query, false);
      filterByPriceList.append(currentCheckbox);
    })

    filters.append(filterByPrice, filterByPriceList);
  }
}

export default Filters;
