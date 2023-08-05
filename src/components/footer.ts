import { createElement } from './utils';

class Footer {
  public drawFooter(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const footer = createElement('div', ['footer']) as HTMLDivElement;
    const wrapper = createElement('div', ['wrapper', 'footer__wrapper']) as HTMLDivElement;
    const rawInfo = createElement('div', ['footer__raw']) as HTMLDivElement;
    const rawBottom = createElement('div', ['footer__raw']) as HTMLDivElement;
    const footerNav = this.drawNav() as HTMLDivElement;
    const info = this.drawInfo() as HTMLDivElement;
    const copyright = createElement(
      'div',
      ['footer__copyright'],
      '© 2023 Toys USA, Inc.',
    ) as HTMLDivElement;
    const socialIcons = this.drawSocialIcons() as HTMLDivElement;

    rawInfo.append(footerNav, info);
    rawBottom.append(copyright, socialIcons);
    wrapper.append(rawInfo, rawBottom);

    footer.append(wrapper);
    body.append(footer);
  }

  private drawNav(): HTMLDivElement {
    const nav = createElement('div', ['footer__nav']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['header__logo'],
      '<h1>t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const navList = createElement(
      'div',
      ['footer__nav-list'],
      `<a href="" class="footer__nav-item">About us</a>
      <a href="" class="footer__nav-item">Contact </a>
      <a href="" class="footer__nav-item">Terms & conditions</a>`,
    ) as HTMLDivElement;

    nav.append(logo, navList);

    return nav;
  }

  private drawInfo(): HTMLDivElement {
    const info = createElement('div', ['footer__info']) as HTMLDivElement;
    const address = createElement(
      'div',
      ['footer__address'],
      `<p>6 Saryarka avenue</br>Nur-Sultan, Kazakhstan</p>`,
    ) as HTMLDivElement;
    const tel = createElement(
      'a',
      ['footer__tel'],
      '<a href="tel:+77771234567" class="footer__tel"><h2>+7(777)123-45-67</h2></a>',
    ) as HTMLLinkElement;
    const email = createElement(
      'a',
      ['footer__email'],
      '<a href="mailto:info@toys.com" class="footer__email"><h2>info@toys.com</h2></a>',
    ) as HTMLLinkElement;

    info.append(tel, email, address);
    return info;
  }

  private drawSocialIcons(): HTMLDivElement {
    const socialIcons = createElement(
      'div',
      ['footer_social-icons'],
      `
    <a href="https://twitter.com/" class="footer__icon footer__twitter"></a>
    <a href="https://www.instagram.com/" class="footer__icon footer__instagram"></a>
    <a href="https://www.facebook.com/" class="footer__icon footer__facebook"></a>
    `,
    ) as HTMLDivElement;

    return socialIcons;
  }
}

export default Footer;
