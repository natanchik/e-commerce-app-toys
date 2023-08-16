class User {
  constructor() {
    this.setEventListeners();
  }

  public isLogged(): boolean {
    const isLogged = false;

    return isLogged;
  }

  private setEventListeners(): void {
    document.addEventListener('DOMContentLoaded', (): void => {});
  }
}

export default User;
