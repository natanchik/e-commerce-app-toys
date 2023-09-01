import { createElement, createInputElement, nullUserState } from '../components/utils';
import { Address, UserState } from '../types/types';
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

    userState.addresses.forEach((address: Address, ind): void => {
      const addressType = ind === 0 ? 'Billing' : 'Shipping';
      const addresses = this.addProfileItem(
        `${addressType.toLocaleLowerCase()}-address`,
        `<p class='profile__address'>${addressType} address</p>`,
        this.drawAddressBlock(addressType.toLocaleLowerCase()),
      );
      addresses.append(this.addAddress(address, userState, ind));
      info.append(addresses);
    });

    const emailComponents = [
      createElement('div', [], `<p>Your current E-mail: <i>${userState.email}</i></p>`),
      this.addPassword('current-password', 'password', 'Input your current password'),
      this.addEmail('Input your new E-mail'),
    ];

    const email = this.addModal('email', userState.email, emailComponents);

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

  private addProfileItem(itemName: string, label?: string, data?: HTMLDivElement): HTMLLIElement {
    const item = createElement('li', ['profile__item'], label) as HTMLLIElement;
    item.id = `${itemName}`;
    if (data) {
      const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
      itemContent.append(data);
      itemContent.dataset.content = `${item.id}`;
      item.append(itemContent);
    }
    return item;
  }

  private addAddress(address: Address, userState: UserState, ind: number): HTMLDivElement {
    const isDefault =
      (ind === 0 ? userState.defaultBillingAddressId : userState.defaultShippingAddressId) === address.id
        ? 'default'
        : '';
    const addressItem = createElement(
      'div',
      ['profile__address', 'profile__address__current'],
      `<p class="main__green-text">${address.country}, ${address.postalCode}, ${address.city}, ${address.streetName}</p>
      <h6 class="main__green-text">${isDefault}</h6>`,
    ) as HTMLDivElement;
    addressItem.dataset.id = address.id;
    return addressItem;
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
    const item = this.addProfileItem(title, itemTitle, modalBg);
    return item;
  }
}

export default UserProfile;
