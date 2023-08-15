import { createElement, createInputElement, createCheckBoxElement } from './utils';

abstract class AuthPage {
  public drawAuthPage(
    mode: string,
    submitText: string,
    footerText: string,
    drawForm: (block: HTMLFormElement) => void,
  ): HTMLDivElement {
    const authPage = createElement('div', ['auth-page', 'main__wrapper']) as HTMLDivElement;
    const authBlock = createElement('div', ['auth-block', `${mode}-block`]) as HTMLDivElement;
    const authHeader = createElement('div', ['auth-header']) as HTMLDivElement;
    const authBtnAuth = createElement(
      'button',
      ['button', 'button_white', 'auth-btn'],
      'Autorization',
    ) as HTMLButtonElement;
    authBtnAuth.setAttribute('id', 'form-auth-btn');
    const authBtnReg = createElement(
      'button',
      ['button', 'button_white', 'auth-btn'],
      'Registration',
    ) as HTMLButtonElement;
    authBtnReg.setAttribute('id', 'form-reg-btn');
    const authForm = createElement('form', ['auth-form']) as HTMLFormElement;

    authPage.append(authBlock);
    drawForm(authForm);

    const submitBtn = createElement('button', ['button', 'button_green', 'auth-btn'], submitText);
    authForm.append(submitBtn);

    const authFooter = createElement('div', ['auth-footer'], footerText);

    authHeader.append(authBtnAuth, authBtnReg);
    authBlock.append(authHeader, authForm, authFooter);

    return authPage;
  }

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
