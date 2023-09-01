import { validateInput } from './validation';

function showProfileItemContent(target: HTMLElement): void {
  target.classList.add('profile__item_active');
  const content = document.querySelector(`[data-content = ${target.id}]`);
  content?.classList.remove('profile__content_hidden');
}

function hideProfileItemContent(target: HTMLElement): void {
  target.classList.remove('profile__item_active');
  const content = document.querySelector(`[data-content = ${target.id}]`);
  content?.classList.add('profile__content_hidden');
}

export function editProfile(target: HTMLElement): void {
  const items = document.querySelectorAll('.profile__item');
  if (target.textContent === 'Edit profile') {
    items.forEach((item) => {
      if (item instanceof HTMLLIElement) {
        showProfileItemContent(item);
      }
    });
    target.textContent = 'Cancel';
  } else {
    items.forEach((item) => {
      if (item instanceof HTMLLIElement) {
        hideProfileItemContent(item);
      }
    });
    target.textContent = 'Edit profile';
  }
}

function toggleAccordion(target: HTMLElement): void {
  if (target.classList.contains('profile__item_active')) {
    hideProfileItemContent(target);
    if (['change-password', 'change-email'].includes(target.id)) {
      document.body.style.overflow = '';
    }
  } else {
    showProfileItemContent(target);
    if (['change-password', 'change-email'].includes(target.id)) {
      document.body.style.overflow = 'hidden';
    }
  }
}

export function toggleProfile(target: HTMLElement): void {
  const item = target.closest('.profile__item');
  if (item && item instanceof HTMLElement) {
    toggleAccordion(item);
  }
  const editBtn = document.querySelector('.profile__edit-btn');
  if (editBtn) {
    if (!document.querySelector('.profile__content_hidden')) {
      editBtn.textContent = 'Cancel';
    } else if (!document.querySelector('.profile__item_active')) {
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
