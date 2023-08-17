import getAccessToken from '../api/tokens/getAccessToken';
import userState from '../state/userState';
import { createElement } from './utils';

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
    const icons = document.querySelector('.header__icons') as HTMLDivElement;
    const beforeIcon = document.querySelector('.header__icon-bascket') as HTMLDivElement;
    const iconLogout = createElement('span', ['header__icon', 'header__icon-logout']) as HTMLSpanElement;
    const userName = createElement('span', ['header__name'], `${userState.firstName}`);

    icons.append(iconLogout);
    icons.insertBefore(userName, beforeIcon);
  }

  public userLogout(): void {}

  private setEventListeners(): void {
    document.addEventListener('DOMContentLoaded', (): void => {
      getAccessToken();
    });
  }
}

export default User;
