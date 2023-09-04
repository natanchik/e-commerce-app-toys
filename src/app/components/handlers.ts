import { validateInput } from './validation';
import updateCustomerNames from '../api/customer/update/update-names';
import updateCustomerBirthday from '../api/customer/update/update-birthday';
import changeCustomerEmail from '../api/customer/update/change-email';
import { nullUserState } from '../components/utils';
import changeCustomerPassword from '../api/customer/update/change-password';
import { checkValidity } from '../api/helpers/checkValidity';

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

export function hideItemContent(id: string, target: HTMLElement, className: string): void {
  target.classList.remove(`${className}__item_active`);
  const content = document.querySelector(`[data-content = ${id}]`);
  content?.classList.add(`${className}__content_hidden`);
  toggleProfileItemBtns(target, 'hide');
}

export function toggleAccordion(id: string, target: HTMLElement, className: string): void {
  if (target.classList.contains(`${className}__item_active`)) {
    hideItemContent(id, target, className);
    if (['change-password', 'change-e-mail'].includes(target.id)) {
      document.body.style.overflow = '';
    }
  } else {
    showItemContent(id, target, className);
    if (['change-password', 'change-e-mail'].includes(target.id)) {
      const currentEmailInput = document.getElementById(`${target.id.slice(7)}__cur-email`);
      const curEmail = localStorage.getItem('userState')
        ? JSON.parse(localStorage.getItem('userState') as string)
        : nullUserState;
      if (currentEmailInput && currentEmailInput instanceof HTMLInputElement) {
        currentEmailInput.value = `${curEmail.email}`;
        currentEmailInput.disabled = true;
      }
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

export async function handlersProfileUpdates(target: HTMLElement): Promise<void> {
  if (target.closest('[data-content="name"]')) {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    if (firstName instanceof HTMLInputElement && lastName instanceof HTMLInputElement) {
      if (firstName.value && lastName.value) {
        updateCustomerNames(firstName.value, lastName.value);
        const nameInfo = document.getElementById('nameInfo');
        if (nameInfo) {
          nameInfo.textContent = firstName.value + ' ' + lastName.value;
        }
      }
    }
    const item = target.closest('.profile__item');
    if (item && item instanceof HTMLElement) {
      toggleAccordion(item?.id, item, 'profile');
    }
  }

  if (target.closest('[data-content="birthday"]')) {
    const birthday = document.getElementById('dateOfBirth');
    if (birthday instanceof HTMLInputElement) {
      updateCustomerBirthday(birthday.value);
      const birthdayInfo = document.getElementById('birthdayInfo');
      if (birthdayInfo) {
        birthdayInfo.textContent = birthday.value;
      }
    }
    const item = target.closest('.profile__item');
    if (item && item instanceof HTMLElement) {
      toggleAccordion(item?.id, item, 'profile');
    }
  }
}

export function addProfileWarning(type: string, message: string): void {
  const warning = document.querySelector('.profile__warning');
  if (warning) {
    warning.className = 'profile__warning';
    if (type === 'success') {
      warning.classList.add('success');
    } else {
      warning.classList.add('error');
    }
    warning.innerHTML = `<p>${message}</p>`;
  }
}

export function removeProfileWarning(): void {
  const warning = document.querySelector('.profile__warning');
  if (warning) {
    warning.className = 'profile__warning';
    warning.innerHTML = '';
  }
}

export async function handlerChangePaswwordSubmit(event: Event, target: HTMLElement): Promise<void> {
  event.preventDefault();
  const isValid: boolean = checkValidity();
  if (isValid) {
    await changeCustomerPassword();
    const item = target.closest('.profile__item_modal');
    if (item && item instanceof HTMLElement) {
      hideItemContent(item.id, item, 'profile');
      document.body.style.overflow = '';
    }
  }
}

export async function handlerChangeEmailSubmit(event: Event, target: HTMLElement): Promise<void> {
  event.preventDefault();
  const isValid: boolean = checkValidity();
  if (isValid) {
    const submitBtn = document.querySelector('.modal-submit') as HTMLButtonElement;
    submitBtn.disabled = true;
    await changeCustomerEmail();
    submitBtn.disabled = false;

    const item = target.closest('.profile__item_modal');
    if (item && item instanceof HTMLElement) {
      hideItemContent(item.id, item, 'profile');
      document.body.style.overflow = '';
    }
  }
}
