import getCategories from '../api/category/getCategories';
import getAnonymousToken from '../api/tokens/getAnonymousToken';
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

    document.addEventListener('click', (event: Event) => {
      const target = event.target as Node;
      if (wrapper.classList.contains('active-sidebar') && target !== document.querySelector('.hamburger')) {
        if (!(target == wrapper || wrapper.contains(target))) {
          this.closeSidebar();
        }
      }
    });

    document.addEventListener('mouseover', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sidebar__category')) {
        const allLists = document.querySelectorAll<HTMLElement>('.sidebar__category-list');
        allLists.forEach((list: HTMLElement): void => {
          list.classList.remove('sidebar__category-list_active');
        })
        const categoryList = document.querySelector(`[data-content="${target.id}"]`) as HTMLElement;
        categoryList.classList.add('sidebar__category-list_active');
      }
    });

    document.addEventListener('mouseout', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sidebar__wrapper')) {
        const allLists = document.querySelectorAll<HTMLElement>('.sidebar__category-list');
        allLists.forEach((list: HTMLElement): void => {
          list.classList.remove('sidebar__category-list_active');
        })
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
    <h4 class="sidebar__link" data-page="catalog">Catalog</h4>`,
    ) as HTMLDivElement;

    const categoriesList = createElement('ul', ['sidebar__categories-list']) as HTMLUListElement;
    this.drawCategoriesList(categoriesList);

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

  private drawCategoriesList(categoriesList: HTMLUListElement): void {
    getAnonymousToken()
      .then(() => getCategories('top', [{ key: 'where', value: 'ancestors%20is%20empty' }]))
      .then(() => {
        const topCategories = JSON.parse(localStorage.getItem('top_categories') as string);

        topCategories.forEach((category: Category): void => {
          const name = category.name['en-US'].toLocaleLowerCase();
          const slug = category.slug['en-US'];

          if (slug !== 'age' && slug !== 'genders') {
            const categoryItem = createElement('li', ['sidebar__category', 'sidebar__link'], name) as HTMLLIElement;
            const categoryContentList = createElement('ul', ['sidebar__category-list']) as HTMLUListElement;
            categoryItem.id = category.id;
            categoryItem.dataset.page = slug;
            categoryContentList.dataset.content = category.id;

            getCategories(`${name}`, [{ key: 'where', value: `parent%28id%3D%22${category.id}%22%29` }]).then(() => {
              const subcategories: Category[] = localStorage.getItem(`${name}_categories`)
                ? JSON.parse(localStorage.getItem(`${name}_categories`) as string)
                : [];

              subcategories.forEach((subcategory: Category): void => {
                const item = createElement(
                  'li',
                  ['sidebar__category-item'],
                  subcategory.name['en-US'],
                ) as HTMLLIElement;
                item.id = subcategory.id;
                item.dataset.page = subcategory.slug['ru-KZ'];
                item.dataset.parent = category.id;

                categoryContentList.append(item);
              });
            });

            categoriesList.append(categoryItem, categoryContentList);
          }
        });
      });

    // document.addEventListener('mouseover', (event: Event) => {
    //   const target = event.target as HTMLElement;

    //   if(target.classList.contains('sidebar__category')) {
    //     const categoriesLlist = document.querySelector(`[data-content="${target.id}"]`) as HTMLUListElement;

    //     categoriesLlist.classList.add('sidebar__category-list_active');
    //   }
    // });

    // document.addEventListener('mouseout', (event: Event) => {
    //   const target = event.target as HTMLElement;

    //   if(target.classList.contains('sidebar__category-list')) {
    //     target.classList.remove('sidebar__category-list_active');
    //   }
    // });
  }
}

export default Sidebar;
