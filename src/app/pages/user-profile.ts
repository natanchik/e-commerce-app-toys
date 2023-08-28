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
    );
    this.addItemContent(name, this.addnameBlock());

    const birthday = this.addProfileItem(
      'birthday',
      `<div><p>Date of birth:</p><p class="main__green-text">${userState.dateOfBirth}</p></div>`,
    );
    this.addItemContent(
      birthday,
      createInputElement('date', 'Date of birth*', 'dateOfBirth', 'auth', true, { name: 'dateOfBirth' }),
    );

    const email = this.addProfileItem(
      'cur-email',
      `<div><p>Email:</p><p class="main__green-text">${userState.email}</p></div>`,
    );
    this.addItemContent(email, this.addEmail());

    const password = this.addChangePassword();

    info.append(name, birthday, email, password);

    userState.addresses.forEach((address: Address, ind): void => {
      const addressType = ind === 0 ? 'Billing' : 'Shipping';
      const addresses = this.addProfileItem(
        `${addressType.toLocaleLowerCase()}-address`,
        `<p class='profile__address'>${addressType} address</p>`,
      );
      addresses.append(this.addAddress(address, userState, ind));
      this.addItemContent(addresses, this.drawAddressBlock(addressType.toLocaleLowerCase()));
      info.append(addresses);
    });

    const editBtn = createElement('button', ['button', 'button_green', 'profile__edit-btn'], 'Edit profile');

    profile.append(editBtn, info);
    return profile;
  }

  private addProfileItem(className: string, data?: string): HTMLLIElement {
    const item = createElement('li', ['profile__item'], data) as HTMLLIElement;
    item.id = `${className}`;
    return item;
  }

  private addItemContent(item: HTMLLIElement, data: HTMLDivElement): void {
    const itemContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement; // , 'profile__content_hidden'
    if (data) {
      itemContent.append(data);
    }
    itemContent.dataset.content = `${item.id}`;
    item.append(itemContent);
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

  private addChangePassword(): HTMLLIElement {
    const password = this.addProfileItem('cur-password', 'Password');
    const passwordTypes = ['current-password', 'new-password', 'new-password-check'];
    const labels = ['Input your current password', 'Input your new password', 'Repeat your new password'];
    const items = createElement('div', ['passwords']) as HTMLDivElement;
    passwordTypes.forEach((passwordType, ind) => {
      items.append(this.addPassword(passwordType, passwordType, labels[ind]));
    });
    this.addItemContent(password, items);
    return password;
  }
}

export default UserProfile;
