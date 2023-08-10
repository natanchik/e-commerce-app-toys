import { createElement } from './utils';

class NotFound {
  public drawNotFound(): HTMLDivElement {
    const wrapper = createElement('div', ['not-found', 'wrapper']) as HTMLDivElement;
    const info = createElement('div', ['not-found__info']) as HTMLDivElement;
    const heading = createElement('h1', ['not-found__heading'], 'ERROR 404!') as HTMLElement;
    const message = createElement(
      'p',
      ['not-found__message'],
      'Oops! The page you are looking for could not be found.',
    ) as HTMLParagraphElement;
    const button = createElement(
      'button',
      ['not-found__button'],
      'BACK TO HOME',
    ) as HTMLButtonElement;
    const img = createElement('div', ['not-found__img']) as HTMLDivElement;

    info.append(heading, message, button);
    wrapper.append(info, img);

    return wrapper;
  }
}

export default NotFound;
