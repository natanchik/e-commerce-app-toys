import getAccessToken from '../api/tokens/getAccessToken';
import { UserState } from '../types/types';
import { createElement, nullUserState } from './utils';

class User {
  constructor() {
    this.setEventListeners();
  }

  static isLogged(): boolean {
    const typeOfToken: string | null = localStorage.getItem('type_of_token');

    if (typeOfToken === 'customer') return true;

    return false;
  }

  public userLogin(): void {
    const userState: UserState = localStorage.getItem('userState')
      ? JSON.parse(localStorage.getItem('userState') as string)
      : nullUserState;
    const icons = document.querySelector('.header__icons') as HTMLDivElement;
    const beforeIcon = document.querySelector('.header__icon-bascket') as HTMLDivElement;
    const logoutIcon = document.querySelector('header__icon-logout') as HTMLDivElement;
    const userName = createElement('span', ['header__name'], `${userState.firstName}`);

    logoutIcon.classList.remove('header__icon-logout_hidden');
    icons.insertBefore(userName, beforeIcon);
  }

  public userLogout(): void {
    const userName = document.querySelector('header__name') as HTMLDivElement;
    const logoutIcon = document.querySelector('header__icon-logout') as HTMLDivElement;
    logoutIcon.classList.add('header__icon-logout_hidden');
    userName.remove();
    localStorage.clear();
  }

  private setEventListeners(): void {
    document.addEventListener('DOMContentLoaded', (): void => {
      if (localStorage.length === 0) {
        getAccessToken();
      }
    });
  }
}

export default User;
