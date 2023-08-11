import { createElement } from './utils';
import Sidebar from './sidebar';

class Main {
  mainElement: HTMLDivElement;

  constructor() {
    this.mainElement = this.drawMain();
  }

  public drawMain(): HTMLDivElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = createElement('div', ['main']) as HTMLDivElement;

    const dimming = createElement('div', ['sidebar__dimming']);
    const sidebar = new Sidebar().drawSidebar();

    body.append(main, sidebar, dimming);

    return main;
  }

  static setContent(element: HTMLDivElement): void {
    const main = document.querySelector('.main') as HTMLDivElement;
    const content = element.outerHTML;
    main.innerHTML = content;
  }

  static createTitleDecotaror(): HTMLDivElement {
    const decorator = createElement('div', ['decorator']) as HTMLDivElement;
    const blue = createElement('div', ['decorator__blue']) as HTMLDivElement;
    const peach = createElement('div', ['decorator__peach']) as HTMLDivElement;
    const green = createElement('div', ['decorator__green']) as HTMLDivElement;

    decorator.append(blue, peach, green);
    return decorator;
  }
}

export default Main;
