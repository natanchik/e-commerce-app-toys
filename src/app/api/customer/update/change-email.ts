import { pushCurrentAction, addUserState } from '../../helpers/utils';
import { addProfileWarning, removeProfileWarning } from '../../../handlers/handlers-profile';
import { BaseUrl } from '../../../components/constants';

const changeCustomerEmail = async (): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const newEmailInput = document.getElementById('email') as HTMLInputElement;
  const newEmail = newEmailInput && newEmailInput instanceof HTMLInputElement ? newEmailInput.value : '';
  const currentActions = [pushCurrentAction('email', 'changeEmail', newEmail)];
  const dataForActions = JSON.stringify({
    version: JSON.parse(localStorage.userState).version,
    actions: currentActions,
  });

  const customerId = JSON.parse(localStorage.userState).id;
  const customerURL = `${BaseUrl}/customers/${customerId}`;

  await fetch(`${customerURL}`, { method: 'POST', headers: myHeaders, body: dataForActions })
    .then((res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then(async (res) => {
      addProfileWarning('success', `Update was successful!`);
      newEmailInput.value = '';
      setTimeout(() => {
        removeProfileWarning();
      }, 3000);
      addUserState(res);
      const emailInfo = document.getElementById('curEmailInfo');
      if (emailInfo) {
        emailInfo.innerHTML = `Your current E-mail: <i>${newEmail}</i>`;
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        addProfileWarning('error', err.message);
        setTimeout(() => {
          removeProfileWarning();
        }, 3000);
      }
    });
};

export default changeCustomerEmail;
