import { createElement, createInputElement, createCheckBoxElement } from './utils';

abstract class AuthPage {
  public drawAuthPage(
    mode: string,
    submitText: string,
    footerText: string,
    drawForm: (block: HTMLElement) => void,
  ): void {
    const authPage = createElement('div', ['auth-page', 'main__wrapper']);
    const authBlock = createElement('div', ['auth-block', `${mode}-block`]);
    const authHeader = createElement('div', ['auth-header']);
    const authBtnAuth = createElement('button', ['button', 'button_white', 'auth-btn'], 'Autorization');
    authBtnAuth.setAttribute('id', 'form-auth-btn');
    const authBtnReg = createElement('button', ['button', 'button_white', 'auth-btn'], 'Registration');
    authBtnReg.setAttribute('id', 'form-reg-btn');
    const authForm = createElement('form', ['auth-form']);

    const parent = document.querySelector('.main');
    if (parent) {
      parent.innerHTML = '';
      parent.append(authPage);
    }
    authPage.append(authBlock);
    authBlock.innerHTML = '';
    authForm.innerHTML = '';

    drawForm(authForm);

    const submitBtn = createElement('button', ['button', 'button_green', 'auth-btn'], submitText);
    authForm.append(submitBtn);

    const authFooter = createElement('div', ['auth-footer'], footerText);

    authHeader.append(authBtnAuth, authBtnReg);
    authBlock.append(authHeader, authForm, authFooter);
  }

  protected addListeners = (id: string, callback: () => void): void => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', callback);
    }
  };

  protected addEmailPassword = (parent: HTMLElement, typeOfPassword: string): void => {
    parent.append(
      createInputElement('email', 'E-mail*', 'email', 'auth', true, {
        name: 'username',
        autocomplete: 'username',
      }),
    );
    const passwordBlock = createInputElement('password', 'Password*', 'password', 'auth', true, {
      name: 'password',
      autocomplete: typeOfPassword,
    });
    const boxShowPassword = createCheckBoxElement('Show password', 'showPassword');
    passwordBlock.append(boxShowPassword);
    parent.append(passwordBlock);

    boxShowPassword.addEventListener('change', () => {
      const passwordInput = document.getElementById('password');
      if (passwordInput && passwordInput instanceof HTMLInputElement) {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      }
    });
  };
}

export default AuthPage;
