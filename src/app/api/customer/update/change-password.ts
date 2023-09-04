import { addUserState } from '../../helpers/utils';
import getCustomerToken from '../../tokens/getCustomerToken';
import { addProfileWarning } from '../../../components/handlers';

const customerURL = `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/me/password`;

const getChangePasswordData = (): { version: string; currentPassword: string; newPassword: string } | undefined => {
  const curPassword = document.getElementById('cur-password') as HTMLInputElement;
  const newPassword = document.getElementById('new-password') as HTMLInputElement;
  if (curPassword && newPassword) {
    return {
      version: JSON.parse(localStorage.userState).version,
      currentPassword: curPassword ? curPassword.value : '',
      newPassword: newPassword ? newPassword.value : '',
    };
  }
};

const changeCustomerPassword = async (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const dataForActions = getChangePasswordData();

  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const addApiStatus = (className: string, errMessage: string): void => {
    apiStatus.classList.add(className);
    apiStatus.innerHTML = errMessage;
  };

  await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: JSON.stringify(dataForActions) })
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else if (res.status === 400) {
        const passwordField = document.getElementById('cur-password');
        passwordField?.classList.add('error-input');
        addProfileWarning('error', 'The given current password does not match.');
        addApiStatus('error-status__update', 'The given current password does not match.');
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async (res) => {
      addApiStatus('success-status__update', `Update was successful!`);
      addUserState(res);
      await getCustomerToken(
        JSON.parse(localStorage.userState).email,
        dataForActions ? dataForActions.newPassword : '',
      );
      addProfileWarning('success', 'Update was successful');
    })
    .catch((err) => {
      if (err.status === 400) {
        const passwordField = document.getElementById('cur-password');
        passwordField?.classList.add('error-input');
        addApiStatus('error-status__update', 'The given current password does not match.');
      } else if (err instanceof Error) {
        addApiStatus('error-status__update', err.message);
      }
    });
};

export default changeCustomerPassword;
