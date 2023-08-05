import { createElement } from './utils';

class Header {
  public drawHeader(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const hrader = createElement('div', ['header']) as HTMLDivElement;
    const wrapper = createElement('div', ['wrapper', 'header__wrapper']) as HTMLDivElement;
    const nav = createElement('nav', ['header__navigation']) as HTMLElement;
    const burger = createElement(
      'span',
      ['hamburger'],
      '<span class="hamburger__line"></span>',
    ) as HTMLSpanElement;
    const navList = createElement('div', ['header__navigation-list']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['header__logo'],
      '<h1>t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const icons = createElement('div', ['header__icons']) as HTMLDivElement;
    const iconUser = createElement('span', [
      'header__icon',
      'header__icon-user',
    ]) as HTMLSpanElement;
    const iconBascket = createElement('span', [
      'header__icon',
      'header__icon-bascket',
    ]) as HTMLSpanElement;

    nav.append(burger, navList);
    icons.append(iconUser, iconBascket);
    wrapper.append(nav, logo, icons);
    hrader.append(wrapper);
    body.append(hrader);
  }
}

export default Header;
