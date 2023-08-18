import { createElement, nullUserState } from '../components/utils';
import { Address, UserState } from '../types/types';

class UserProfile {
  public drawProfile(): HTMLDivElement {
    const userState: UserState = localStorage.getItem('userState')
      ? JSON.parse(localStorage.getItem('userState') as string)
      : nullUserState;
    const profile = createElement('div', ['profile', 'main__wrapper']) as HTMLDivElement;
    const title = createElement(
      'div',
      ['profile__title'],
      `
    <h5>Welcome back,</h5>
    <h4 class="profile__name">${userState.firstName} ${userState.lastName}</h4>`,
    ) as HTMLDivElement;
    const info = createElement('ul', ['profile__info']) as HTMLUListElement;
    const birthday = this.addProfileItem(
      'birthday',
      `<p>Date of birth:</p><p class="main__green-text">${userState.dateOfBirth}</p>`,
    );
    const email = this.addProfileItem('email', `<p>Email:</p><p class="main__green-text">${userState.email}</p>`);
    const addresses = this.addProfileItem('addresses', 'Addresses');

    // userState.addresses.forEach((address: Address): void => {
    //   addresses.append(this.addAddress(address));
    // })

    info.append(birthday, email, addresses);
    profile.append(title, info);
    return profile;
  }

  private addProfileItem(className: string, data?: string): HTMLLIElement {
    const item = createElement('li', ['profile__item', `profile__${className}`], data) as HTMLLIElement;

    return item;
  }

  private addAddress(address: Address): HTMLDivElement {
    const addressItem = createElement(
      'div',
      ['profile__address'],
      `<p class="profile__address-line"><b>${address.country}</b> ${address.streetName}</p>
      <p class="profile__address-line">${address.postalCode} ${address.city}</p>`,
    ) as HTMLDivElement;
    addressItem.dataset.id = address.id;

    return addressItem;
  }
}

export default UserProfile;
