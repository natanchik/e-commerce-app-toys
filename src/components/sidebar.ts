import { createElement } from './utils';
import categories from './constants';
import pages from '../router/pages';
import Router from '../router/router';

class Sidebar {
  constructor(router: Router) {
    this.setEventListeners(router);
  }

  public drawSidebar(): HTMLDivElement {
    const wrapper = createElement('div', ['sidebar__wrapper']) as HTMLDivElement;
    const header = createElement('div', ['sidebar__header']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['header__logo'],
      '<h1 class="logo">t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const closeBtn = createElement('button', ['sidebar__close-btn']) as HTMLButtonElement;
    const content = this.drawSidebarContent();

    header.append(logo, closeBtn);
    wrapper.append(header, content);

    closeBtn.addEventListener('click', this.closeSidebar);
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapper.classList.contains('active-sidebar') &&
        target !== document.querySelector('.hamburger')
      ) {
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
      `<div class="sidebar__link" data-page="main">Home</div>
    <div class="sidebar__link" dapage="catalogue">Catalogue</div>`,
    ) as HTMLDivElement;
    const categoriesList = createElement('ul', ['sidebar__categories-list']) as HTMLUListElement;
    for (const [key, value] of Object.entries(categories)) {
      const category = createElement('li', ['sidebar__category']) as HTMLElement;
      const categoryName = createElement('li', ['sidebar__category-name'], key) as HTMLElement;
      category.append(categoryName);
      for (const sortBy of value) {
        const item = createElement('div', ['sidebar__categories-item'], sortBy) as HTMLElement;
        category.append(item);
      }
      categoriesList.append(category);
    }

    content.append(commonLinks, categoriesList);

    return content;
  }

  private closeSidebar(): void {
    const dimming = document.querySelector('.sidebar__dimming');
    const wrapper = document.querySelector('.sidebar__wrapper');
    dimming?.classList.remove('active-dimming');
    document.body.classList.remove('hidden-overflow');
    wrapper?.classList.remove('active-sidebar');
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (
        target.classList.contains('logo') ||
        target.parentElement?.classList.contains('logo') ||
        target.dataset.page === 'main'
      ) {
        router.navigate(pages.MAIN);
        this.closeSidebar();
      }
    });
  }
}

export default Sidebar;
