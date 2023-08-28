import getCategories from '../api/category/getCategories';
import { Category } from '../types/types';
import { createCheckBoxElement, createElement } from './utils';

class Filters {
  public drawFilters(): HTMLDivElement {
    const filters = createElement('div', ['catalog__filters', 'filters']) as HTMLDivElement;

    getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]);
    const topCategories: Category[] = localStorage.getItem('top_categories')
      ? JSON.parse(localStorage.getItem('top_categories') as string)
      : [];

    topCategories.forEach((category: Category): void => {
      const name = category.name['en-US'].toLocaleLowerCase();
      const filter = createElement('div', ['filters__filter'], `<h4>${name}</h4>`) as HTMLDivElement;
      const filterContent = createElement('div', ['filters__filter-categories']) as HTMLDivElement;

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

    return filters;
  }

  // private drawCheckbox(): HTMLDivElement {
  //   const filterContent = createElement('div', ['filters__filter-categories']) as HTMLDivElement;

  //   return filterContent;
  // }
}

export default Filters;
