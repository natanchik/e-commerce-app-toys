import { createElement } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import pages from '../router/pages';
import { validateInput } from './validation';
import { getLoginData, getRegisterData } from '../api/helpers/getDataFromInput';
import { checkValidity } from '../api/helpers/checkValidity';
import { loginCustomer } from '../api/customer/loginCustomer';
import createCustomer from '../api/customer/createCustomer';
import User from './user';

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

  private async loginViaForm(target: HTMLFormElement, router: Router): Promise<void> {
    const submitBtn = document.querySelector('.auth-btn.submit-login') as HTMLButtonElement;
    const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
    const data = getLoginData(target as HTMLFormElement);

    submitBtn.setAttribute('disabled', 'true');
    await loginCustomer(data.username, data.password);

    if (apiStatus.classList.contains('success-status')) {
      setTimeout(() => {
        router.navigate(pages.MAIN);
        User.userLogin();
      }, 1500);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  }

  private async registerViaForm(router: Router): Promise<void> {
    const submitBtn = document.querySelector('.auth-btn.submit-register') as HTMLButtonElement;
    const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
    const data = getRegisterData();
    const defaultBilling = document.getElementById('as-default-billing') as HTMLInputElement;
    const defaultShipping = document.getElementById('as-default-shipping') as HTMLInputElement;
    const checkDefaultBilling = defaultBilling.checked;
    const checkDefaultShipping = defaultShipping.checked;

    submitBtn.setAttribute('disabled', 'true');
    await createCustomer(data, checkDefaultBilling, checkDefaultShipping);

    if (apiStatus.classList.contains('success-status__register')) {
      setTimeout(() => {
        router.navigate(pages.MAIN);
        User.userLogin();
      }, 1500);
    } else {
      submitBtn.removeAttribute('disabled');
    }
  }

  private toggleAccordion(id: string, target: HTMLElement): void {
    if (target.classList.contains('profile__item_active')) {
      target.classList.remove('profile__item_active');
      const content = document.querySelector(`[data-content = ${id}]`);
      content?.classList.add('profile__content_hidden');
    } else {
      target.classList.add('profile__item_active');
      const content = document.querySelector(`[data-content = ${id}]`);
      content?.classList.remove('profile__content_hidden');
    }
  }

  private makeMiniActive(slideIndex: number): void {
    const minis = document.querySelectorAll('.product-card__mini') as NodeListOf<HTMLDivElement>;

    minis.forEach((mini) => {
      mini.classList.remove('active-mini');
    });
    minis[slideIndex - 1].classList.add('active-mini');
  }

  private switchNextSlide(): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
    const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
    const widthModal = slidesModal[0].clientWidth + 60;

    if (currentIndex > slides.length - 1) {
      currentIndex = 1;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `none`;
      slidesRowModal.style.transform = `none`;
    } else {
      slidesRow.style.transform = `translateX(${-width * currentIndex}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * currentIndex}px)`;

      currentIndex++;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
    }
    this.makeMiniActive(currentIndex);
  }

  private switchPrevSlide(): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    const slidesRowModal = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
    const slidesModal = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
    const widthModal = slidesModal[0].clientWidth + 60;

    if (currentIndex <= 1) {
      currentIndex = slides.length;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
    } else {
      currentIndex--;
      cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);

      slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
      slidesRowModal.style.transform = `translateX(${-widthModal * (currentIndex - 1)}px)`;
    }
    this.makeMiniActive(currentIndex);
  }

  private getImagebyMini(target: HTMLElement): void {
    const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
    let currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;

    const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
    const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
    const width = slides[0].clientWidth + 60;

    currentIndex = +target.getAttribute('data-index')!;
    cardWrapper.setAttribute('data-slideIndex', `${currentIndex}`);
    slidesRow.style.transform = `translateX(${-width * (currentIndex - 1)}px)`;
    this.makeMiniActive(currentIndex);
  }

  private toggleCardModal(slideIndex: number): void {
    const modal = document.querySelector('.modal-card__dimming');
    modal?.classList.toggle('modal-active');
    if (modal?.classList.contains('modal-active')) {
      const slidesRow = document.querySelector('.modal-card__slides-row') as HTMLDivElement;
      const slides = document.querySelectorAll('.modal-card__slide') as NodeListOf<HTMLDivElement>;
      const width = slides[0].clientWidth + 60;

      slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
    } else {
      const slidesRow = document.querySelector('.product-card__slides-row') as HTMLDivElement;
      const slides = document.querySelectorAll('.product-card__slide') as NodeListOf<HTMLDivElement>;
      const width = slides[0].clientWidth + 60;

      slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
      this.makeMiniActive(slideIndex);
    }
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
        router.navigate(pages.AUTORIZATION);
      }

      if (target.classList.contains('profile__item')) {
        this.toggleAccordion(target.id, target);
      }

      if (target.classList.contains('main-page__page')) {
        const pageName = target.innerText.toLocaleLowerCase();
        router.navigate(pageName === 'main' ? pages.MAIN : pageName);
      }

      if (
        target.classList.contains('product-card__next-slide') ||
        target.classList.contains('modal-card__next-slide')
      ) {
        this.switchNextSlide();
      }

      if (
        target.classList.contains('product-card__prev-slide') ||
        target.classList.contains('modal-card__prev-slide')
      ) {
        this.switchPrevSlide();
      }

      if (target.classList.contains('product-card__mini-img')) {
        this.getImagebyMini(target);
      }

      if (
        target.classList.contains('product-card__slide-img') ||
        target.classList.contains('modal-card__close-btn') ||
        (target.classList.contains('modal-card__dimming') && target !== document.querySelector('.modal-card__wrapper'))
      ) {
        const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
        const currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;
        this.toggleCardModal(currentIndex);
      }
    });

    document.addEventListener('submit', async (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('login-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();

        if (isValid) {
          this.loginViaForm(target as HTMLFormElement, router);
        }
      }

      if (target.classList.contains('register-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();

        if (isValid) {
          this.registerViaForm(router);
        }
      }

      if (target.classList.contains('product-card__form')) {
        event.preventDefault();
      }
    });

    document.addEventListener('input', (event: Event): void => {
      const target = event.target as HTMLInputElement;
      const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
      apiStatus.className = 'api-status';
      apiStatus.innerHTML = '';

      if (target.classList.contains('auth-input')) {
        const notation = document.querySelector(`[data-input="${target.id}"]`) as HTMLParagraphElement;
        if (notation) {
          validateInput(target, notation);
        }
      }
    });

    document.addEventListener('change', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.id === 'are-same-addresses') {
        const shippingBlock = document.getElementById('shipping-block') as HTMLDivElement;
        const shippingInputs = [
          document.getElementById('shipping-country') as HTMLInputElement,
          document.getElementById('shipping-city') as HTMLInputElement,
          document.getElementById('shipping-streetName') as HTMLInputElement,
          document.getElementById('shipping-postalCode') as HTMLInputElement,
        ];
        shippingBlock.classList.toggle('hidden');
        if (shippingInputs[0].hasAttribute('required')) {
          shippingInputs.forEach((input) => {
            input.removeAttribute('required');
          });
        } else {
          shippingInputs.forEach((input) => {
            input.setAttribute('required', 'true');
          });
        }
      }

      if (target.id === 'billing-country' || target.id === 'shipping-country') {
        const inputId = `${target.id.split('-')[0]}-postalCode`;
        const postalCode = document.getElementById(inputId) as HTMLInputElement;
        const notation = document.querySelector(`[data-input="${inputId}"]`) as HTMLParagraphElement;
        if (notation) {
          validateInput(postalCode, notation);
        }
      }

      if (target.id === 'showPassword') {
        const passwordInput = document.getElementById('password');
        if (passwordInput && passwordInput instanceof HTMLInputElement) {
          passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        }
      }
    });
  }
}

export default Main;
