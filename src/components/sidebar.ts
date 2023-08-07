import { createElement } from './utils';

const categories = {
  'Shop by stage': [
    'Baby Toys: 0-12M',
    ' Toddler: 1-3 Years',
    'Pre-School: 3-5 Years',
    'School Age: 5 Years +',
  ],
  'Imaginative Play': [
    'Play Kitchens & Shops',
    'Role Play & Dress Up',
    'Play Cars, Trains & Transport',
  ],
  'Educational Toys': [
    'Montessori Toys',
    'Shape Sorters',
    'Games & Puzzles',
    'Musical Instruments',
  ],
  'Outdoor Play': ['Sand & Water Play', 'Bikes, Trikes & Scooters', 'Garden Play & Discovery'],
};

class Sidebar {
  public drawSidebar(): Node {
    const wrapper = createElement('div', ['sidebar__wrapper']) as HTMLDivElement;
    const header = createElement('div', ['sidebar__header']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['header__logo'],
      '<h1>t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const closeBtn = createElement('button', ['sidebar__close-btn']) as HTMLButtonElement;

    const commonLinks = createElement(
      'div',
      ['sidebar__common-links'],
      `<a href="" class="sidebar__link">Home</a>
    <a href="" class="sidebar__link">Catalogue</a>`,
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
    const login = createElement(
      'div',
      ['sidebar__link'],
      `<a href="" class="sidebar__login sidebar__link">Log in</a>`,
    );

    header.append(logo, closeBtn);
    wrapper.append(header, commonLinks, categoriesList, login);

    closeBtn.addEventListener('click', () => {
      const dimming = document.querySelector('.sidebar__dimming');
      dimming?.classList.remove('inactive-dimming');
      document.body.classList.add('hidden-body');
      wrapper.classList.remove('active-sidebar');
    });

    return wrapper as Node;
  }
}

export default Sidebar;
