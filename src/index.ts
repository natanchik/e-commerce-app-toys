import './styles/style.scss';
import App from './app/app';
import getAccessToken from './app/api/tokens/getAccessToken';
import getAnonymousToken from './app/api/tokens/getAnonymousToken';
import getAllProducts from './app/api/getProduct/getAllProducts';
import getCategories from './app/api/category/getCategories';
import { hideLoading, showLoadig } from './app/components/utils';
import refreshToken from './app/api/tokens/refreshToken';
import { createMyCart } from './app/api/cart/createMyCart';

const loadTokens = async (): Promise<void> => {
  showLoadig();
  if (!localStorage.getItem('token_info') && localStorage.getItem('token_info') !== 'customer') await getAccessToken();
  if (!localStorage.getItem('anonymous_token')) await getAnonymousToken();
  if (!localStorage.getItem('all_products')) await getAllProducts();
  if (!localStorage.getItem('categories')) await getCategories();
  if (!localStorage.getItem('cart')) await createMyCart();
  if (localStorage.getItem('anonymous_token')) {
    await setInterval(async () => {
      await refreshToken(JSON.parse(localStorage.getItem('anonymous_token') as string).refresh_token);
    }, 10800000);
  }
};

loadTokens().then(() => {
  hideLoading();
});

const app = new App();
app.startApp();
