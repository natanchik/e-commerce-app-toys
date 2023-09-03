import './styles/style.scss';
import App from './app/app';
import getAccessToken from './app/api/tokens/getAccessToken';
import getAnonymousToken from './app/api/tokens/getAnonymousToken';
import getAllProducts from './app/api/getProduct/getAllProducts';

const loadTokens = async (): Promise<void> => {
  await getAccessToken();
  await getAnonymousToken();
  await getAllProducts();
};

loadTokens().then(() => {
  const app = new App();
  app.startApp();
});
