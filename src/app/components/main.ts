import { createElement, encodeText } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import { pages } from '../router/pages';
import { getLoginData, getRegisterData } from '../api/helpers/getDataFromInput';
import { checkValidity } from '../api/helpers/checkValidity';
import { loginCustomer } from '../api/customer/loginCustomer';
import createCustomer from '../api/customer/createCustomer';
import removeCustomerAddress from '../api/customer/update/remove-address';
import User from './user';
import getAllProducts from '../api/getProduct/getAllProducts';
import {
  catalogQueryParams,
  productAgeSelectedIds,
  productGendersSelectedIds,
  productTypesSelectedIds,
} from '../state/state';
import Catalog from '../pages/catalog';
import Filters from './filters';
import { sorterParametrs } from './constants';
import getProductsBySearch from '../api/getProduct/getProductsBySearch';
import { addNewQueryParam } from '../api/helpers/utils';
import {
  toggleProfileEditMode,
  toggleProfileItems,
  toggleAccordion,
  handlerSameAddresses,
  handlerCountry,
  handlerShowPassword,
  handlerValInput,
  handlersProfileUpdates,
  handlerChangePaswwordSubmit,
  handlerChangeEmailSubmit,
  handlerAddAddressSubmit,
  handlerProfileEditMode,
  handlerDefaultAddress,
  clearCart,
} from '../components/handlers';

import { toggleCatalogAddProductButton } from './handlers-catalog';
import { changeCartItemQuantityFromCart } from './handlers-cart';
import { toggleCardAddProductButton, changeCartItemQuantityFromCard } from './handlers-card';

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
    const dimming = createElement('div', ['sidebar__dimming']) as HTMLDivElement;

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

  private async redrawProducts(): Promise<void> {
    await getAllProducts();
    Catalog.drawProducts();
  }

  private addFilterNavigationForCheckbox(currentTarget: HTMLInputElement): void {
    if (currentTarget.checked === true) {
      switch (currentTarget.dataset.filters) {
        case 'age':
          productAgeSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'age',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productAgeSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          break;
        case 'genders':
          productGendersSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'genders',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productGendersSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          break;
        case 'product-type':
          productTypesSelectedIds.add(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'product-type',
            'where',
            `productType%28id%20in%20%28${Array.from(productTypesSelectedIds).join(',%20')}%29%29`,
          );
          break;
      }
      this.redrawProducts();
    } else {
      switch (currentTarget.dataset.filters) {
        case 'age':
          productAgeSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'age',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productAgeSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          if (productAgeSelectedIds.size === 0) {
            catalogQueryParams.delete('age');
          }
          break;
        case 'genders':
          productGendersSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'genders',
            'where',
            `masterData%28current%28categories%28id%20in%20%28${Array.from(productGendersSelectedIds).join(
              ',%20',
            )}%29%29%29%29`,
          );
          if (productGendersSelectedIds.size === 0) {
            catalogQueryParams.delete('genders');
          }
          break;
        case 'product-type':
          productTypesSelectedIds.delete(`%22${currentTarget.id}%22`);
          addNewQueryParam(
            'product-type',
            'where',
            `productType%28id%20in%20%28${Array.from(productTypesSelectedIds).join(',%20')}%29%29`,
          );
          if (productTypesSelectedIds.size === 0) {
            catalogQueryParams.delete('product-type');
          }
          break;
      }
      this.redrawProducts();
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
      const miniRow = document.querySelector('.product-card__minis-row');
      const width = slides[0].clientWidth + 60;

      slidesRow.style.transform = `translateX(${-width * (slideIndex - 1)}px)`;
      if (miniRow) {
        this.makeMiniActive(slideIndex);
      }
    }
  }

  private deleteSortFromQueryParam(): void {
    Object.keys(sorterParametrs).forEach((key: string) => {
      catalogQueryParams.delete(key);
    });
  }

  private addFilterNavigationForSelect(currentTarget: HTMLSelectElement): void {
    switch (currentTarget.value) {
      case 'name-asc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20asc`);
        this.redrawProducts();
        break;
      case 'name-desc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `masterData.current.name.en-US%20desc`);
        this.redrawProducts();
        break;
      case 'price-asc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `key%20asc`);
        this.redrawProducts();
        break;
      case 'price-desc':
        this.deleteSortFromQueryParam();
        addNewQueryParam(currentTarget.value, 'sort', `key%20desc`);
        this.redrawProducts();
        break;
      default:
        localStorage.removeItem('sorted_products');
        this.deleteSortFromQueryParam();
        this.redrawProducts();
        break;
    }
  }

  private async addFilterNavigationForSearch(currentTarget: HTMLInputElement): Promise<void> {
    const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
    close.classList.remove('filters__close_hidden');
    if (currentTarget.value.length === 0) {
      localStorage.removeItem('search_products');
      Catalog.drawProducts();
      close.classList.add('filters__close_hidden');
    } else {
      await getProductsBySearch(encodeText(currentTarget.value)).then(() => {
        Catalog.drawProducts();
      });
    }
  }

  private clearFilterForSearch(): void {
    const close = document.querySelector('.filters__close_search') as HTMLParagraphElement;
    const search = document.querySelector('.filters__search') as HTMLInputElement;
    search.value = '';
    localStorage.removeItem('search_products');
    close.classList.add('filters__close_hidden');
    this.redrawProducts();
  }

  private addFilterNavigationForPrices(): void {
    const close = document.querySelector('.filters__close_prices') as HTMLParagraphElement;
    close.classList.remove('filters__close_hidden');
    const from = document.getElementById('price-from') as HTMLInputElement;
    const to = document.getElementById('price-to') as HTMLInputElement;
    const fromValue = Number(from.value) * 100;
    const toValue = to.value ? Number(to.value) * 100 : 5000000;
    addNewQueryParam(
      'price',
      'where',
      `masterData%28current%28masterVariant%28prices%28country%3D%22US%22%20and%20%28%28value%28centAmount%20%3E%3D%20${fromValue}%29%20and%20value%28centAmount%20%3C%3D%20${toValue}%29%29%20or%20discounted%28%28value%28centAmount%20%3E%3D%20${fromValue}%29%20and%20value%28centAmount%20%3C%3D%20${toValue}%29%29%29%29%29%29%29%29`,
    );
    this.redrawProducts();
  }

  private clearFilterForPrices(): void {
    const from = document.getElementById('price-from') as HTMLInputElement;
    const to = document.getElementById('price-to') as HTMLInputElement;
    from.value = '';
    to.value = '';
    catalogQueryParams.delete('price');
    this.redrawProducts();
  }

  private async addNavigationForSidebar(currentTarget: HTMLLIElement, router: Router): Promise<void> {
    Catalog.clearSortedProducts();
    if (currentTarget.dataset.page !== 'catalog') {
      addNewQueryParam(
        'sidebar',
        'where',
        `masterData%28current%28categories%28id%3D%22${currentTarget.id}%22%29%29%29`,
      );
    }

    await getAllProducts();

    this.sidebar.closeSidebar();
    if (currentTarget.dataset.page === 'catalog') {
      router.navigate(pages.CATALOG);
    } else {
      router.navigate(`${pages.CATALOG}/${currentTarget.dataset.page}`);
    }
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', async (event: Event): Promise<void> => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'main') {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'catalog') {
        Catalog.clearSortedProducts();
        router.navigate(pages.CATALOG);
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

      if (
        !(
          target.classList.contains('profile__content') ||
          target.closest('.profile__content') ||
          target.classList.contains('profile__address__btn')
        ) &&
        target.closest('.profile__item_inline')
      ) {
        toggleProfileItems(target);
      }

      if (
        (!(target.classList.contains('profile__modal') || target.closest('.profile__modal')) &&
          target.closest('.profile__item_modal')) ||
        target.classList.contains('modal-cancel')
      ) {
        toggleProfileItems(target);
      }

      if (target.classList.contains('profile__edit-btn')) {
        toggleProfileEditMode(target);
      }

      if (target.classList.contains('profile__update')) {
        handlersProfileUpdates(target);
      }

      if (target.classList.contains('profile__address__delete-btn')) {
        const address = target.closest('.profile__address');
        if (address && address instanceof HTMLElement && address.dataset.id) {
          removeCustomerAddress(address.dataset.id);
        }
      }

      if (target.classList.contains('profile__address__edit-btn')) {
        handlerProfileEditMode(target);
      }
      if (target.classList.contains('profile__address__default-btn')) {
        handlerDefaultAddress(target);
      }

      if (target.classList.contains('main-page__page')) {
        const pageName: string = target.dataset.page ? target.dataset.page : '';
        if (pageName === 'catalog') Catalog.clearSortedProducts();
        router.navigate(pageName);
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

      if (target.classList.contains('product-card__add-to-cart')) {
        toggleCardAddProductButton(target, router);
      }

      if (target.classList.contains('product-card__increase-quantity')) {
        changeCartItemQuantityFromCard(target, router, 'add');
      }

      if (target.classList.contains('product-card__decrease-quantity')) {
        changeCartItemQuantityFromCard(target, router, 'decrease');
      }

      if (target.classList.contains('filters__item')) {
        toggleAccordion(target.id, target, 'filters');
      }

      if (target.classList.contains('filters__checkbox')) {
        const currentTarget = target as HTMLInputElement;
        this.addFilterNavigationForCheckbox(currentTarget);
      }

      if (target.classList.contains('filters__button')) {
        Filters.resetAllFilters();
        this.redrawProducts();
      }

      if (target.classList.contains('mobile-filters__item')) {
        toggleAccordion('mobile-filters', target, 'mobile-filters');
      }

      if (target.classList.contains('filters__apply_prices')) {
        this.addFilterNavigationForPrices();
      }

      if (target.classList.contains('filters__close_prices')) {
        this.clearFilterForPrices();
      }

      if (target.classList.contains('filters__close_search')) {
        this.clearFilterForSearch();
      }

      if (
        target.classList.contains('sidebar__category') ||
        target.classList.contains('sidebar__category-item') ||
        target.classList.contains('catalog__breadcrumb')
      ) {
        const currentTarget = target as HTMLLIElement;
        this.addNavigationForSidebar(currentTarget, router);
      }

      if (target.classList.contains('catalog__product')) {
        const currentID = target.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }

      if (target.classList.contains('product__buttons') || target.classList.contains('product__button')) {
        toggleCatalogAddProductButton(target);
      }

      if (target.parentElement?.classList.contains('catalog__product')) {
        const parentDiv = target.parentNode as HTMLDivElement;
        const currentID = parentDiv.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }

      if (target.classList.contains('cart__delete-cart-btn')) {
        clearCart().then(() => {
          router.navigate(pages.CART);
        });
      }

      if (target.classList.contains('cart__link-to-catalog')) {
        event.preventDefault();
        Catalog.clearSortedProducts();
        router.navigate(pages.CATALOG);
      }

      if (target.classList.contains('cart__item__btn-plus')) {
        changeCartItemQuantityFromCart(target, router, 'add');
      }

      if (target.classList.contains('cart__item__btn-minus')) {
        changeCartItemQuantityFromCart(target, router, 'decrease');
      }

      if (target.classList.contains('cart__item__btn-delete')) {
        changeCartItemQuantityFromCart(target, router, 'remove');
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

      if (target.classList.contains('profile__password__form')) {
        handlerChangePaswwordSubmit(event, target);
      }

      if (target.classList.contains('profile__e-mail__form')) {
        handlerChangeEmailSubmit(event, target);
      }

      if (target.classList.contains('profile__address__form')) {
        handlerAddAddressSubmit(event, target);
      }
    });

    document.addEventListener('input', (event: Event): void => {
      const target = event.target as HTMLInputElement;

      if (
        !target.parentElement?.classList.contains('filters__checkbox-block') &&
        !target.classList.contains('filters__search') &&
        !target.classList.contains('filters__price-input') &&
        !target.classList.contains('filters__select')
      ) {
        handlerValInput(event);
      }
    });

    document.addEventListener('change', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.id === 'are-same-addresses') {
        handlerSameAddresses();
      }

      if (target.id.includes('country')) {
        handlerCountry(target);
      }

      if (target.id.includes('showPassword')) {
        handlerShowPassword(target);
      }

      if (target.classList.contains('filters__select')) {
        const currentTarget = target as HTMLSelectElement;
        this.addFilterNavigationForSelect(currentTarget);
      }

      if (target.classList.contains('filters__search')) {
        const currentTarget = target as HTMLInputElement;
        this.addFilterNavigationForSearch(currentTarget);
      }

      if (target.classList.contains('filters__select')) {
        const currentTarget = target as HTMLSelectElement;
        this.addFilterNavigationForSelect(currentTarget);
      }

      if (target.classList.contains('filters__search')) {
        const currentTarget = target as HTMLInputElement;
        this.addFilterNavigationForSearch(currentTarget);
      }
    });
  }
}

export default Main;
