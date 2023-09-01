import getAnonymousToken from '../api/tokens/getAnonymousToken';

class User {
  constructor() {
    this.setEventListeners();
  }

  static isLogged(): boolean {
    const typeOfToken: string | null = localStorage.getItem('type_of_token');

    if (typeOfToken === 'customer') return true;
    return false;
  }

  static toggleLogoutIcon(remove: boolean = false): void {
    const logoutIcon = document.querySelector('.header__icon-logout') as HTMLDivElement;

    if (remove && logoutIcon.classList.contains('header__icon-logout_hidden')) {
      logoutIcon.classList.remove('header__icon-logout_hidden');
    } else {
      logoutIcon.classList.add('header__icon-logout_hidden');
    }
  }

  static userLogin(): void {
    this.toggleLogoutIcon(true);
  }

  static userLogout(): void {
    this.toggleLogoutIcon();
    localStorage.clear();
    getAnonymousToken();
  }

  private setEventListeners(): void {
    document.addEventListener('DOMContentLoaded', (): void => {
      if (localStorage.length === 0) {
        getAnonymousToken();
      }

      if (!User.isLogged()) {
        User.toggleLogoutIcon();
      }
    });
  }
}

export default User;
