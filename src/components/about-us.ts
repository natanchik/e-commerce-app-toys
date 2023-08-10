import { createElement } from './utils';

class AboutUS {
  public drawAboutUs(): HTMLDivElement {
    const aboutUs = createElement(
      'div',
      ['about-us', 'wrapper'],
      '<h2>Привет! Это страница о нас</h2>',
    ) as HTMLDivElement;

    return aboutUs;
  }
}

export default AboutUS;
