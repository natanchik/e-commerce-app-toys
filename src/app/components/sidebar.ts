import getCategories from '../api/category/getCategories';
import { Category } from '../types/types';
import { createElement } from './utils';

class Sidebar {
  public drawSidebar(): HTMLDivElement {
    const wrapper = createElement('div', ['sidebar__wrapper']) as HTMLDivElement;
    const header = createElement('div', ['sidebar__header']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['sidebar__logo'],
      '<h1 class="logo">t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const closeBtn = createElement('button', ['sidebar__close-btn']) as HTMLButtonElement;
    const content = this.drawSidebarContent();

    header.append(logo, closeBtn);
    wrapper.append(header, content);

    closeBtn.addEventListener('click', this.closeSidebar);
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapper.classList.contains('active-sidebar') && target !== document.querySelector('.hamburger')) {
        if (!(target == wrapper || wrapper.contains(target))) {
          this.closeSidebar();
        }
      }
    });

    return wrapper;
  }

  private drawSidebarContent(): HTMLDivElement {
    const content = createElement('div', ['sidebar__content']) as HTMLDivElement;
    const commonLinks = createElement(
      'div',
      ['sidebar__common-links'],
      `<h4 class="sidebar__link" data-page="main">Home</h4>
    <h4 class="sidebar__link" data-page="catalogue">Catalogue</h4>`,
    ) as HTMLDivElement;
    const categoriesList = createElement('ul', ['sidebar__categories-list']) as HTMLUListElement;
    let topCategories: Category[] = [];

    if (localStorage.getItem('top_categories') === null) {
      getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]).then(() => {
        topCategories = JSON.parse(localStorage.getItem('top_categories') as string);
      });
      //отобразить сообщение об ошибке если не загрузились категории
    }
    
    topCategories = JSON.parse(localStorage.getItem('top_categories') as string);

    topCategories.forEach((category: Category): void => {
      const name = category.name['en-US'].toLocaleLowerCase();
      const slug = category.slug['en-US'];

      if (slug !== 'age' && slug !== 'genders') {
        const categoryItem = createElement('li', ['sidebar__category', 'sidebar__link'], name) as HTMLElement;
        categoryItem.id = category.id;
        categoryItem.dataset.page = slug;

        getCategories(`${name}`, [{ key: 'where', value: `parent%28id%3D%22${category.id}%22%29` }]).then(() => {
          const subcategories: Category[] = localStorage.getItem(`${name}_categories`)
            ? JSON.parse(localStorage.getItem(`${name}_categories`) as string)
            : [];

          subcategories.forEach((subcategory: Category): void => {

          })

        })


        categoriesList.append(categoryItem);
      }
    });

  
    // for (const [key, value] of Object.entries(categories)) {
    //   const category = createElement('li', ['sidebar__category']) as HTMLElement;
    //   const categoryName = createElement('li', ['sidebar__category-name'], key) as HTMLElement;
    //   category.append(categoryName);
    //   for (const sortBy of value) {
    //     const item = createElement('div', ['sidebar__categories-item'], sortBy) as HTMLElement;
    //     category.append(item);
    //   }
    //   categoriesList.append(category);
    // }

    content.append(commonLinks, categoriesList);

    return content;
  }

  public closeSidebar(): void {
    const dimming = document.querySelector('.sidebar__dimming');
    const wrapper = document.querySelector('.sidebar__wrapper');
    dimming?.classList.remove('active-dimming');
    document.body.classList.remove('hidden-overflow');
    wrapper?.classList.remove('active-sidebar');
  }
}

export default Sidebar;
