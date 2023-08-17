import getAccessToken from '../api/tokens/getAccessToken';

class User {
  constructor() {
    this.setEventListeners();
  }

  static isLogged(): boolean {
    const typeOfToken: string | null = localStorage.getItem('type_of_token');

    if (typeOfToken === 'customer') return true;

    return false;
  }

  public userLogOut(): void {}

  private setEventListeners(): void {
    document.addEventListener('DOMContentLoaded', (): void => {
      getAccessToken();
    });
  }
}

export default User;
