import { countries, salutation } from './constants';
import {
  createElement,
  createInputElement,
  createSelectElement,
  createCheckBoxElement,
} from './utils';

class LoginPage {
  private mode = 'Autorization';

  public drawLoginPage(): void {
    const loginBlockType = this.mode === 'Autorization' ? 'auth-block' : 'reg-block';
    const loginPage = createElement('div', ['login-page']);
    const loginBlock = createElement('div', ['login-block', loginBlockType]);
    const loginHeader = createElement('div', ['login-header']);
    const loginBtnAuth = createElement('button', ['button', 'login-btn'], 'Autorization');
    const loginBtnReg = createElement('button', ['button', 'login-btn'], 'Registration');
    const loginForm = createElement('form', ['login-form']);

    const authFooter = `<p>I am not registered. <a href=''>Go to Registration.</a></p> 
    <p>I forgot password. <a href=''>Reset</a></p>`;
    const regFooter = `<p>I am registered. <a href="">Go to Login.</a></p>
    <p>I forgot password. <a href="">Reset</a></p>`;

    const parent = document.querySelector('.main');
    if (parent) {
      parent.innerHTML = '';
      parent.append(loginPage);
    }
    loginPage.append(loginBlock);
    loginBlock.innerHTML = '';
    loginForm.innerHTML = '';

    if (this.mode === 'Autorization') {
      this.drawAuthBlock(loginForm);
    } else {
      this.drawRegBlock(loginForm);
    }

    const submitText = this.mode === 'Autorization' ? 'Enter' : 'Register';
    const submitBtn = createElement('button', ['button', 'button_white', 'login-btn'], submitText);
    loginForm.append(submitBtn);

    const footerText = this.mode === 'Autorization' ? authFooter : regFooter;
    const loginFooter = createElement('div', ['login-footer'], footerText);

    loginHeader.append(loginBtnAuth, loginBtnReg);
    loginBlock.append(loginHeader, loginForm, loginFooter);

    loginBtnAuth.addEventListener('click', () => {
      this.mode = 'Autorization';
      this.drawLoginPage();
    });

    loginBtnReg.addEventListener('click', () => {
      this.mode = 'Registration';
      this.drawLoginPage();
    });
  }

  private drawAuthBlock(parent: HTMLElement): void {
    parent.append(
      createInputElement('email', 'E-mail', 'email', 'login', true, {
        name: 'username',
        autocomplete: 'username',
      }),
    );
    parent.append(
      createInputElement('password', 'Password', 'password', 'login', true, {
        name: 'password',
        autocomplete: 'current-password',
      }),
    );
  }

  private drawRegBlock(parent: HTMLElement): void {
    const emailBlock = createElement('div', ['login-row']);
    emailBlock.append(
      createInputElement('email', 'E-mail*', 'email', 'login', true, {
        name: 'username',
        autocomplete: 'username',
      }),
    );
    emailBlock.append(
      createInputElement('password', 'Password*', 'password', 'login', true, {
        name: 'password',
        autocomplete: 'new-password',
      }),
    );
    parent.append(emailBlock);

    const nameBlock = createElement('div', ['login-row']);
    nameBlock.append(createInputElement('text', 'First name*', 'firstName', 'login'));
    nameBlock.append(createInputElement('text', 'Last name*', 'lastName', 'login'));
    parent.append(nameBlock);

    const userInfo = createElement('div', ['login-row']);
    userInfo.append(createInputElement('date', 'Date of birth*', 'dateOfBirth', 'login'));
    userInfo.append(createSelectElement(salutation, 'Salutation', 'salutation', 'login', false));
    parent.append(userInfo);

    const sameAddress = createCheckBoxElement(
      'Billing and shipping addresses are the same',
      'are-same-addresses',
    );
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
  }

  private drawAddressBlock = (type: string): HTMLDivElement => {
    const addressBlock = createElement('div', ['login-row', 'address-block']) as HTMLDivElement;
    addressBlock.setAttribute('id', `${type}-block`);
    const addressTitle = createElement('p', ['address-title'], `Input your ${type} address`);

    const userAddress = createElement('div', ['login-row']);
    userAddress.append(createSelectElement(countries, 'Country*', `${type}-country`, 'login'));
    userAddress.append(createInputElement('text', 'City*', `${type}-city`, 'login'));
    userAddress.append(createInputElement('text', 'Street*', `${type}-streetName`, 'login'));
    userAddress.append(
      createInputElement('number', 'Postal code*', `${type}-postalCode`, 'login', true, {
        min: 10000,
        max: 999999,
      }),
    );

    const asDefault = createCheckBoxElement('Set as default address', `as-default-${type}`);
    addressBlock.append(addressTitle, userAddress, asDefault);

    return addressBlock;
  };
}

export default LoginPage;
