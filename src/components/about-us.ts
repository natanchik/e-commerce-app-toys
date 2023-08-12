import Main from './main';
import { createElement } from './utils';

class AboutUS {
  public drawAboutUs(): HTMLDivElement {
    const aboutUs = createElement('div', [
      'about-us',
      'main__wrapper',
      'main__wrapper_thin',
    ]) as HTMLDivElement;
    const title = createElement('h2', ['about-us__title'], 'About us') as HTMLDivElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;
    const text = `
    <p>We stock a wide variety of products for the customer who is looking for quality at affordable prices.</p>
    <p>Our goal is to provide customers with a hassle-free online shopping experience.</p>
    <p>We aim to give everyone, whatever their age, the best service possible and welcome feedback from our customers on all aspects of their shopping experience.</p>
    <p class="main__blue-text">Thanks to our rich selection of toys and games, you’ll find something for kids of all ages and interests, whether you’re looking for inside or outside entertainment.</p>
    <p>All our products are in stock and ready to be dispatched immediately from our warehouse Kazakhstan.</p>
    `;
    const content = createElement('div', ['about-us__content'], text) as HTMLDivElement;

    aboutUs.append(title, decorator, content);
    return aboutUs;
  }
}

export default AboutUS;
