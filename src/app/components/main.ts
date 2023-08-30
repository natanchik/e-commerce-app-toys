import { createElement } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import { pages } from '../router/pages';
import { validateInput } from './validation';
import { getLoginData, getRegisterData } from '../api/helpers/getDataFromInput';
import { checkValidity } from '../api/helpers/checkValidity';
import { loginCustomer } from '../api/customer/loginCustomer';
import createCustomer from '../api/customer/createCustomer';
import User from './user';
import getAllProducts from '../api/getProduct/getAllProducts';
import { catalogQueryParams } from '../state/state';
import Catalog from '../pages/catalog';
import { QueryParam } from '../types/types';

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

  private toggleAccordion(id: string, target: HTMLElement, className: string): void {
    const content = document.querySelector(`[data-content = ${id}]`);

    if (target.classList.contains(`${className}__item_active`)) {
      target.classList.remove(`${className}__item_active`);
      content?.classList.add(`${className}__content_hidden`);
    } else {
      target.classList.add(`${className}__item_active`);
      content?.classList.remove(`${className}__content_hidden`);
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
        this.toggleAccordion(target.id, target, 'profile');
      }

      if (target.classList.contains('main-page__page')) {
        const pageName = target.innerText.toLocaleLowerCase();
        router.navigate(pageName === 'main' ? pages.MAIN : pageName);
      }

      if (target.classList.contains('filters__item')) {
        this.toggleAccordion(target.id, target, 'filters');
      }

      if (target.parentElement?.classList.contains('filters__checkbox-block')) {
        const currentTarget = target as HTMLInputElement;

        if (currentTarget.checked === true) {
          let queryParam: QueryParam = {
            key: '',
            value: '',
          };

          if (currentTarget.dataset.filters === 'category') {
            queryParam = {
              key: 'where',
              value: `masterData%28current%28categories%28id%3D%22${currentTarget.id}%22%29%29%29`,
            };
          }

          if (currentTarget.dataset.filters === 'price') {
            queryParam = {
              key: 'where',
              value: `masterData%28current%28masterVariant%28prices%28country%3D%22US%22%20and%20%28${currentTarget.id}%29%29%29%29%29%29%29`,
            };
          }

          if (currentTarget.dataset.filters === 'price') {
            queryParam = {
              key: 'where',
              value: `masterData%28current%28masterVariant%28prices%28country%3D%22US%22%20and%20%28${currentTarget.id}%29%29%29%29%29%29%29`,
            };
          }

          if (currentTarget.dataset.filters === 'product-type') {
            queryParam = {
              key: 'where',
              value: `productType%28id%3D%22${currentTarget.id}%22%29`,
            };
          }

          console.log(currentTarget.checked);

          catalogQueryParams.set(currentTarget.id, queryParam);
          getAllProducts().then((result) => {
            Catalog.drawProducts();
          });
        } else {
          console.log(currentTarget.checked);
          catalogQueryParams.delete(currentTarget.id);
          getAllProducts().then((result) => {
            Catalog.drawProducts();
          });
        }
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
    });

    document.addEventListener('input', (event: Event): void => {
      const target = event.target as HTMLInputElement;

      if (!target.parentElement?.classList.contains('filters__checkbox-block') && target.parentElement?.classList.contains('checkbox-block')) {
        const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
        apiStatus.className = 'api-status';
        apiStatus.innerHTML = '';

        if (target.classList.contains('auth-input')) {
          const notation = document.querySelector(`[data-input="${target.id}"]`) as HTMLParagraphElement;
          if (notation) {
            validateInput(target, notation);
          }
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

    document.addEventListener('select', (event: Event): void => {
      const target = event.target as HTMLSelectElement;

      if (target.classList.contains('filters__select')) {
        console.log(target.value);
      }
    });
  }
}

export default Main;
