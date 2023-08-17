import AuthPage from '../components/autorization';
import { countries, salutation } from '../components/constants';
import { createElement, createInputElement, createSelectElement, createCheckBoxElement } from '../components/utils';

class RegPage extends AuthPage {
  public drawRegPage = (): HTMLDivElement => {
    const regPage: HTMLDivElement = this.drawAuthPage('reg', 'Sign up', '', this.drawFormBlock);

    return regPage;
  };

  private drawFormBlock = (parent: HTMLFormElement): void => {
    const emailBlock = createElement('div', ['auth-row']);
    this.addEmailPassword(emailBlock, 'new-password');
    parent.append(emailBlock);

    const nameBlock = createElement('div', ['auth-row']);
    nameBlock.append(createInputElement('text', 'First name*', 'firstName', 'auth', true, { name: 'firstName' }));
    nameBlock.append(createInputElement('text', 'Last name*', 'lastName', 'auth', true, { name: 'lastName' }));
    parent.append(nameBlock);

    const userInfo = createElement('div', ['auth-row']);
    userInfo.append(createInputElement('date', 'Date of birth*', 'dateOfBirth', 'auth', true, { name: 'dateOfBirth' }));
    userInfo.append(createSelectElement(salutation, 'Salutation', 'salutation', 'auth', false));
    parent.append(userInfo);

    const sameAddress = createCheckBoxElement('Billing and shipping addresses are the same', 'are-same-addresses');
    parent.append(sameAddress);

    const billingBlock = this.drawAddressBlock('billing');
    const shippingBlock = this.drawAddressBlock('shipping');
    parent.append(billingBlock, shippingBlock);

    const policyAgreeText =
      'I agree with <span class="link-terms">The terms of personal data processing</span> and <span class="link-privacy"> Privacy policy</span>';
    parent.append(createCheckBoxElement(policyAgreeText, 'policyInput', true));
  };

  protected drawAddressBlock = (type: string): HTMLDivElement => {
    const addressBlock = createElement('div', ['auth-row', 'address-block']) as HTMLDivElement;
    addressBlock.setAttribute('id', `${type}-block`);
    const addressTitle = createElement('h4', ['address-title'], `Input your ${type} address:`);

    const userAddress = createElement('div', ['auth-row']);
    userAddress.append(
      createSelectElement(countries, 'Country*', `${type}-country`, 'auth', true, { name: `${type}-country` }),
    );
    userAddress.append(createInputElement('text', 'City*', `${type}-city`, 'auth', true, { name: `${type}-city` }));
    userAddress.append(
      createInputElement('text', 'Street*', `${type}-streetName`, 'auth', true, { name: `${type}-streetName` }),
    );
    const postalCode = createInputElement('number', 'Postal code*', `${type}-postalCode`, 'auth', true, {
      name: `${type}-postalCode`,
      min: 10000,
      max: 999999,
    });
    postalCode.classList.add('postalCode');
    userAddress.append(postalCode);

    const asDefault = createCheckBoxElement('Set as default address', `as-default-${type}`);
    addressBlock.append(addressTitle, userAddress, asDefault);

    return addressBlock;
  };
}

export default RegPage;
