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
    const addresses = this.addProfileItem('addresses', 'Addresses:');
    const addressesContent = createElement('div', ['profile__content', 'profile__content_hidden']) as HTMLDivElement;
    addressesContent.dataset.content = 'addresses';

    userState.addresses.forEach((address: Address): void => {
      addressesContent.append(this.addAddress(address, userState));
    });

    info.append(birthday, email, addresses, addressesContent);
    profile.append(title, info);
    return profile;
  }

  private addProfileItem(className: string, data?: string): HTMLLIElement {
    const item = createElement('li', ['profile__item'], data) as HTMLLIElement;
    item.id = `${className}`;

    return item;
  }

  private addAddress(address: Address, userState: UserState): HTMLDivElement {
    const title =
      address.id && userState.billingAddressIds.includes(address.id)
        ? 'Billing address:'
        : address.id && userState.shippingAddressIds.includes(address.id)
        ? 'Shipping address:'
        : '';
    const isDefault =
      userState.defaultBillingAddress === address.id || userState.defaultShippingAddress === address.id
        ? 'default'
        : '';
    const addressItem = createElement(
      'div',
      ['profile__address'],
      `<h5 class="profile__address-title">${title}</h5>
      <p class="profile__address-line">${address.country}, ${address.postalCode} ${address.city}</p>
      <p class="profile__address-line">${address.streetName}</p>
      <h6>${isDefault}</h6>`,
    ) as HTMLDivElement;
    addressItem.dataset.id = address.id;

    return addressItem;
  }
}

export default UserProfile;
