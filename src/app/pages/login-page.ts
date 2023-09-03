import AuthPage from '../components/autorization';
import getAccessToken from '../api/tokens/getAccessToken';

class LoginPage extends AuthPage {
  footerText = `<div>I forgot password. <span class='reset-password-btn'>Reset</span></div>`;

  public drawLoginPage = (): HTMLDivElement => {
    getAccessToken();
    return this.drawAuthPage('login', 'Login', this.footerText, this.drawFormBlock);
  };

  private drawFormBlock = (parent: HTMLFormElement): void => {
    parent.append(this.addEmail());
    parent.append(this.addPassword('current-password'));
  };
}

export default LoginPage;
