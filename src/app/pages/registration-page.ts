import AuthPage from '../components/autorization';
import LoginPage from './login-page';
import { countries, salutation } from '../components/constants';
import { createElement, createInputElement, createSelectElement, createCheckBoxElement } from '../components/utils';

class RegPage extends AuthPage {
  footerText = `<p>I am registered. <a href="">Go to Login.</a></p>
  <p>I forgot password. <a href="">Reset</a></p>`;

  public drawRegPage = (): void => {
    this.drawAuthPage('reg', 'Register', this.footerText, this.drawFormBlock);
    this.addListeners('form-auth-btn', function () {
      new LoginPage().drawLoginPage();
    });
  };

  private drawFormBlock = (parent: HTMLElement): void => {
    const emailBlock = createElement('div', ['auth-row']);
    this.addEmailPassword(emailBlock, 'new-password');
    parent.append(emailBlock);

    const nameBlock = createElement('div', ['auth-row']);
    nameBlock.append(createInputElement('text', 'First name*', 'firstName', 'auth'));
    nameBlock.append(createInputElement('text', 'Last name*', 'lastName', 'auth'));
    parent.append(nameBlock);

    const userInfo = createElement('div', ['auth-row']);
    userInfo.append(createInputElement('date', 'Date of birth*', 'dateOfBirth', 'auth'));
    userInfo.append(createSelectElement(salutation, 'Salutation', 'salutation', 'auth', false));
    parent.append(userInfo);

    const sameAddress = createCheckBoxElement('Billing and shipping addresses are the same', 'are-same-addresses');
    parent.append(sameAddress);

    const billingBlock = this.drawAddressBlock('billing');
    const shippingBlock = this.drawAddressBlock('shipping');
    parent.append(billingBlock, shippingBlock);

    const policyAgreeText =
      'I agree with <a href="">The terms of personal data processing</a> and <a href=""> Privacy policy</a>';
    parent.append(createCheckBoxElement(policyAgreeText, 'policyInput', true));

    sameAddress.addEventListener('change', () => {
      shippingBlock.classList.toggle('hidden');
    });
  };

  protected drawAddressBlock = (type: string): HTMLDivElement => {
    const addressBlock = createElement('div', ['auth-row', 'address-block']) as HTMLDivElement;
    addressBlock.setAttribute('id', `${type}-block`);
    const addressTitle = createElement('p', ['address-title'], `Input your ${type} address`);

    const userAddress = createElement('div', ['auth-row']);
    userAddress.append(createSelectElement(countries, 'Country*', `${type}-country`, 'auth'));
    userAddress.append(createInputElement('text', 'City*', `${type}-city`, 'auth'));
    userAddress.append(createInputElement('text', 'Street*', `${type}-streetName`, 'auth'));
    const postalCode = createInputElement('number', 'Postal code*', `${type}-postalCode`, 'auth', true, {
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
