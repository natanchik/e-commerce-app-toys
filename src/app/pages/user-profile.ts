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

    const email = this.addChangeEmail(userState.email);

    const password = this.addChangePassword();

    info.append(email, password);

    const editBtn = createElement('button', ['button', 'button_green', 'profile__edit-btn'], 'Edit profile');

    profile.append(editBtn, info);
    return profile;
  }

  private addProfileItem(itemName: string, label?: string, data?: HTMLDivElement): HTMLLIElement {
    const item = createElement('li', ['profile__item'], label) as HTMLLIElement;
    item.id = `${itemName}`;
    if (data) {
      const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement; // , 'profile__content_hidden'
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

  private addChangeEmail(curEmail: string): HTMLLIElement {
    const modalBg = createElement('div', ['profile__modal__bg']) as HTMLDivElement;
    const passwordModal = createElement(
      'div',
      ['profile__modal'],
      `<h4>UPDATE E-MAIL</h4><p></p><p>Your current E-mail: <i>${curEmail}</i></p>`,
    ) as HTMLDivElement;
    modalBg.append(passwordModal);

    passwordModal.append(this.addPassword('current-password', 'password', 'Input your current password'));
    passwordModal.append(this.addEmail('Input your new E-mail'));
    passwordModal.append(createElement('button', ['button', 'button_green', 'password-submit'], 'Update E-mail'));

    const emailTitle = `<div><p>Email:</p><p class="main__green-text">${curEmail}</p></div>`;
    const email = this.addProfileItem('change-email', emailTitle, modalBg);
    return email;
  }

  private addChangePassword(): HTMLLIElement {
    const passwordTypes = ['current-password', 'new-password', 'new-password'];
    const labels = ['Input your current password', 'Input your new password', 'Confirm your new password'];
    const modalBg = createElement('div', ['profile__modal__bg']) as HTMLDivElement;
    const passwordModal = createElement('div', ['profile__modal'], '<h4>CHANGE PASSWORD</h4><p></p>') as HTMLDivElement;
    modalBg.append(passwordModal);
    passwordTypes.forEach((passwordType, ind) => {
      passwordModal.append(this.addPassword(passwordType, passwordType, labels[ind]));
    });
    passwordModal.append(createElement('button', ['button', 'button_green', 'password-submit'], 'Change password'));
    const password = this.addProfileItem('change-password', 'Password', modalBg);
    return password;
  }
}

export default UserProfile;
