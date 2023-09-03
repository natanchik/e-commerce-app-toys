import { validateInput } from './validation';

function toggleProfileItemBtns(target: HTMLElement, action: string): void {
  const saveBtn = target.querySelector('.profile__update');
  if (saveBtn) {
    if (action === 'show') {
      saveBtn.classList.remove('profile__content_hidden');
    } else {
      saveBtn.classList.add('profile__content_hidden');
    }
  }

  const type = target.id.includes('address') ? target.id.split('-')[0] : '';
  if (type) {
    const btns = document.querySelectorAll(`.profile__${type}-address__btn`);
    btns.forEach((btn) => {
      if (action === 'show') {
        btn.classList.remove('profile__content_hidden');
      } else {
        btn.classList.add('profile__content_hidden');
      }
    });
  }
}

function showItemContent(id: string, target: HTMLElement, className: string): void {
  target.classList.add(`${className}__item_active`);
  const content = document.querySelector(`[data-content = ${id}]`);
  content?.classList.remove(`${className}__content_hidden`);
  toggleProfileItemBtns(target, 'show');
}

function hideItemContent(id: string, target: HTMLElement, className: string): void {
  target.classList.remove(`${className}__item_active`);
  const content = document.querySelector(`[data-content = ${id}]`);
  content?.classList.add(`${className}__content_hidden`);
  toggleProfileItemBtns(target, 'hide');
}

export function toggleAccordion(id: string, target: HTMLElement, className: string): void {
  if (target.classList.contains(`${className}__item_active`)) {
    hideItemContent(id, target, className);
    if (['change-password', 'change-email'].includes(target.id)) {
      document.body.style.overflow = '';
    }
  } else {
    showItemContent(id, target, className);
    if (['change-password', 'change-e-mail'].includes(target.id)) {
      document.body.style.overflow = 'hidden';
    }
  }
}

export function toggleProfileEditMode(target: HTMLElement): void {
  const items = document.querySelectorAll('.profile__item_inline');
  items.forEach((item) => {
    if (item instanceof HTMLLIElement) {
      if (target.textContent === 'Edit profile') {
        showItemContent(item.id, item, 'profile');
      } else {
        hideItemContent(item.id, item, 'profile');
      }
    }
  });
  target.textContent = target.textContent === 'Edit profile' ? 'Cancel' : 'Edit profile';
}

export function toggleProfileItems(target: HTMLElement): void {
  const item = target.closest('.profile__item');
  if (item && item instanceof HTMLElement) {
    toggleAccordion(item.id, item, 'profile');
  }
  const editBtn = document.querySelector('.profile__edit-btn');
  const items = document.querySelectorAll('.profile__item_active');
  if (editBtn) {
    if (items.length === 4) {
      editBtn.textContent = 'Cancel';
    } else if (items.length === 0) {
      editBtn.textContent = 'Edit profile';
    }
  }
}

export function handlerSameAddresses(): void {
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

export function handlerCountry(target: HTMLElement): void {
  const inputId = `${target.id.split('-')[0]}-postalCode`;
  const postalCode = document.getElementById(inputId) as HTMLInputElement;
  const notation = document.querySelector(`[data-input="${inputId}"]`) as HTMLParagraphElement;
  if (notation) {
    validateInput(postalCode, notation);
  }
}

export function handlerShowPassword(target: HTMLElement): void {
  const passwordInput = document.getElementById(target.id.slice(13));
  if (passwordInput && passwordInput instanceof HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
}

export function handlerValInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target.parentElement?.classList.contains('filters__checkbox-block')) {
    const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
    apiStatus.className = 'api-status';
    apiStatus.innerHTML = '';

    if (target.classList.contains('auth-input') && target instanceof HTMLInputElement) {
      const notation = document.querySelector(`[data-input="${target.id}"]`) as HTMLParagraphElement;
      if (notation) {
        validateInput(target, notation);
      }
    }
  }
}
