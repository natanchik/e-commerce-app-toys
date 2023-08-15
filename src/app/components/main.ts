import { createElement } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import pages from '../router/pages';

class Main {
  mainElement: HTMLDivElement;

  sidebar: Sidebar;

  sidebarWrapper: HTMLDivElement;

  constructor(router: Router) {
    this.sidebar = new Sidebar();
    this.sidebarWrapper = this.sidebar.drawSidebar();
    this.mainElement = this.drawMain();
    this.setEventListeners(router);
  }

  public drawMain(): HTMLDivElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = createElement('div', ['main']) as HTMLDivElement;
    const dimming = createElement('div', ['sidebar__dimming']);

    body.append(main, this.sidebarWrapper, dimming);

    return main;
  }

  static setContent(element: HTMLDivElement): void {
    const main = document.querySelector('.main') as HTMLDivElement;
    const content = element.outerHTML;
    main.innerHTML = content;
  }

  static createTitleDecorator(): HTMLDivElement {
    const decorator = createElement('div', ['decorator']) as HTMLDivElement;
    const blue = createElement('div', ['decorator__blue']) as HTMLDivElement;
    const peach = createElement('div', ['decorator__peach']) as HTMLDivElement;
    const green = createElement('div', ['decorator__green']) as HTMLDivElement;

    decorator.append(blue, peach, green);
    return decorator;
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'main') {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.classList.contains('logo') || target.parentElement?.classList.contains('logo')) {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.id === 'form-reg-btn') {
        router.navigate(pages.REGISTRATION);
      }

      if (target.id === 'form-auth-btn') {
        router.navigate(pages.LOGIN);
      }
    });
  }
}

export default Main;
