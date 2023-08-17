import AuthPage from '../components/autorization';

class LoginPage extends AuthPage {
  footerText = `<div>I forgot password. <a href=''>Reset</a></div>`;

  public drawLoginPage = (): HTMLDivElement => {
    return this.drawAuthPage('login', 'Login', this.footerText, this.drawFormBlock);
  };

  private drawFormBlock = (parent: HTMLFormElement): void => {
    this.addEmailPassword(parent, 'current-password');
  };
}

export default LoginPage;
