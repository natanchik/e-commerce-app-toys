import './styles/style.scss';
import App from './app/app';
import getAccessToken from './app/api/tokens/getAccessToken';
import getAnonymousToken from './app/api/tokens/getAnonymousToken';
import getAllProducts from './app/api/getProduct/getAllProducts';
import getCategories from './app/api/category/getCategories';
import { hideLoading, showLoadig } from './app/components/utils';

const loadTokens = async (): Promise<void> => {
  showLoadig();
  if (!localStorage.getItem('token_info') && localStorage.getItem('token_info') !== 'customer') await getAccessToken();
  if (!localStorage.getItem('anonymous_token')) await getAnonymousToken();
  if (!localStorage.getItem('all_products')) await getAllProducts();
  if (!localStorage.getItem('categories')) await getCategories();
};

loadTokens().then(() => {
  hideLoading();
  const app = new App();
  app.startApp();
});
