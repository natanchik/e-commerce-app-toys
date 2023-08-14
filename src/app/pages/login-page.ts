import AuthPage from '../components/autorization';
import RegPage from './registration-page';

class LoginPage extends AuthPage {
  footerText = `<p>I am not registered. <a href=''>Go to Registration.</a></p> 
  <p>I forgot password. <a href=''>Reset</a></p>`;

  public drawLoginPage = (): void => {
    this.drawAuthPage('login', 'Login', this.footerText, this.drawFormBlock);
    this.addListeners('form-reg-btn', function () {
      new RegPage().drawRegPage();
    });
  };

  private drawFormBlock = (parent: HTMLElement): void => {
    this.addEmailPassword(parent, 'current-password');
  };
}

export default LoginPage;
