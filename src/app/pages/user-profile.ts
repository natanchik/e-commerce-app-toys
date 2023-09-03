import { createElement, createInputElement, nullUserState } from '../components/utils';
import { UserState } from '../types/types';
import RegPage from '../pages/registration-page';

class UserProfile extends RegPage {
  public drawProfile(): HTMLDivElement {
    const userState: UserState = localStorage.getItem('userState')
      ? JSON.parse(localStorage.getItem('userState') as string)
      : nullUserState;
    const profile = createElement('div', ['profile', 'main__wrapper']) as HTMLDivElement;
    const info = createElement('ul', ['profile__info']) as HTMLUListElement;

    const name = this.addProfileItem(
      'name',
      `<div class="profile__name"><p>First name, Last name</p><p class="main__green-text">${userState.firstName} ${userState.lastName}</p></div>`,
      this.addnameBlock(),
    );

    const birthday = this.addProfileItem(
      'birthday',
      `<div><p>Date of birth:</p><p class="main__green-text">${userState.dateOfBirth}</p></div>`,
      createInputElement('date', 'Date of birth*', 'dateOfBirth', 'auth', true, { name: 'dateOfBirth' }),
    );

    info.append(name, birthday);

    const billingAddresses = this.addAddressTypeItem(userState, 'Billing');
    const shippingAddresses = this.addAddressTypeItem(userState, 'Shipping');
    info.append(billingAddresses, shippingAddresses);

    const emailComponents = [
      createElement('div', [], `<p>Your current E-mail: <i>${userState.email}</i></p>`),
      this.addPassword('current-password', 'password', 'Input your current password'),
      this.addEmail('Input your new E-mail'),
    ];

    const email = this.addModal('e-mail', userState.email, emailComponents);

    const passwordComponents = [
      this.addPassword('current-password', 'cur-password', 'Input your current password'),
      this.addPassword('new-password', 'new-password', 'Input your new password'),
      this.addPassword('new-password', 'new-password-check', 'Confirm your new password'),
    ];

    const password = this.addModal('password', userState.email, passwordComponents);

    info.append(email, password);

    const editBtn = createElement('button', ['button', 'button_green', 'profile__edit-btn'], 'Edit profile');

    profile.append(editBtn, info);
    return profile;
  }

  private addProfileItem(itemName: string, label?: string, data?: HTMLDivElement, btn: boolean = true): HTMLLIElement {
    const item = createElement('li', ['profile__item', 'profile__item_inline'], label) as HTMLLIElement;
    item.id = `${itemName}`;
    if (data) {
      const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
      itemContent.append(data);
      itemContent.dataset.content = `${item.id}`;
      if (btn) {
        itemContent.append(
          createElement(
            'button',
            ['button', 'button_green', 'profile__update', 'profile__content_hidden'],
            'Save changes',
          ),
        );
      }
      item.append(itemContent);
    }
    return item;
  }

  private addAddressTypeItem(userState: UserState, type: string): HTMLLIElement {
    const item = createElement(
      'li',
      ['profile__item', 'profile__item_inline'],
      `<p class='profile__address__title'>${type} addresses</p>`,
    ) as HTMLLIElement;
    item.id = `${type}-address`;
    const defaultId = type === 'Billing' ? userState.defaultBillingAddressId : userState.defaultShippingAddressId;
    const ids = type === 'Billing' ? userState.billingAddressIds : userState.shippingAddressIds;
    ids.forEach((id) => {
      userState.addresses.forEach((address) => {
        if (address.id === id) {
          const isDefault = defaultId === address.id ? ': default' : '';
          const addressText = createElement(
            'div',
            ['profile__address__text'],
            `<p class="main__green-text">- ${address.country}, ${address.postalCode}, ${address.city}, ${address.streetName}${isDefault}</p>`,
          );
          const addressItem = createElement('div', ['profile__address', `${type}-address`]) as HTMLDivElement;
          addressItem.append(addressText);
          addressItem.append(
            createElement(
              'button',
              [
                'profile__address__btn',
                `profile__${type}-address__btn`,
                `profile__${type}-address__edit-btn`,
                'profile__content_hidden',
              ],
              '&#128221;',
            ),
          );
          addressItem.append(
            createElement(
              'button',
              [
                'profile__address__btn',
                `profile__${type}-address__btn`,
                `profile__${type}-address__delete-btn`,
                'profile__content_hidden',
              ],
              'X',
            ),
          );
          addressItem.dataset.id = id;
          item.append(addressItem);
        }
      });
    });
    const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
    const addressForm = createElement('form', ['profile__address__form']);
    const addressTemplate = this.drawAddressBlock(type);
    const saveBtn = createElement(
      'button',
      ['button', 'button_green', 'profile__update', 'profile__content_hidden'],
      'Save address',
    );
    const btnAnotherAddress = createElement('p', ['profile__add-another-address'], 'Add another address');
    const btnBlock = createElement('div', ['profile__address__btn-block']);

    btnBlock.append(btnAnotherAddress, saveBtn);
    addressForm.append(addressTemplate, btnBlock);
    itemContent.append(addressForm);
    itemContent.dataset.content = `${item.id}`;
    item.append(itemContent);
    return item;
  }

  private addModal(title: string, curEmail: string, components: HTMLElement[]): HTMLLIElement {
    const modalBg = createElement('div', ['profile__modal__bg']) as HTMLDivElement;
    const modal = createElement('div', ['profile__modal'], `<h4>Change ${title}</h4>`) as HTMLDivElement;
    const modalForm = createElement('form', ['auth-form', 'profile__modal__form']) as HTMLFormElement;
    modalBg.append(modal);
    modal.append(modalForm);

    const currentEmail = this.addEmail('Input your new E-mail', `${title}__cur-email`);
    currentEmail.classList.add('profile__email__current');
    const inputCurEmail = document.getElementById(`${title}__cur-email`);
    if (inputCurEmail && inputCurEmail instanceof HTMLInputElement) {
      inputCurEmail.value = `${curEmail}`;
    }
    const apiStatus = createElement('p', ['api-status'], '');
    const btnBlock = createElement('div', ['profile__modal__btn-block']);
    const cancelBtn = createElement('button', ['button', 'modal-cancel'], `Cancel`);
    const submitBtn = createElement('button', ['button', 'button_green', 'modal-submit'], `Change ${title}`);
    btnBlock.append(cancelBtn, submitBtn);

    modalForm.append(apiStatus, currentEmail, ...components, btnBlock);
    const itemTitle = title[0].toUpperCase() + title.slice(1);
    const item = this.addProfileItem(`change-${title}`, itemTitle, modalBg, false);
    item.className = 'profile__item';
    return item;
  }
}

export default UserProfile;
