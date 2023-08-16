import { getAllCustomersEmails } from './getAllCustomers';
import { fillUserState } from './getCustomerByID';

const loginURL = `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token?grant_type=password`;

const myHeaders = {
  Authorization: 'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

const incorrectResponseText = 'Incorrect response from the server, please try later';
const notExistEmailText = `The email address doesn't exist, please enter correct one or register`;
const incorrectPassText = `The password you entered is incorrect, please try again`;

export const loginCustomer = async (username: string, password: string): Promise<void> => {
  const apiStatus = document.querySelector('.api-status') as HTMLParagraphElement;
  const emailInput = document.querySelector('#email') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;

  await fetch(`${loginURL}&username=${username}&password=${password}`, requestOptions)
    .then(async (res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        throw new Error(incorrectResponseText);
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        const existedEmails = (await getAllCustomersEmails()) as string[];
        switch (res.status) {
          case 400:
            if (existedEmails.indexOf(username) === -1) {
              throw new Error(notExistEmailText);
            } else {
              throw new Error(incorrectPassText);
            }
          default:
            throw new Error(`The error with status code ${res.status} has occured, please try later`);
        }
      }
    })
    .then(async (res) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('refresh', res.refresh_token);
      localStorage.setItem('type_of_token', 'customer');
      await fillUserState(username);
      apiStatus.classList.add('success-status');
      apiStatus.innerHTML = `Enjoy the shopping!`;
    })
    .catch((err) => {
      if (err instanceof Error) {
        apiStatus.classList.add('error-status');
        apiStatus.innerHTML = `${err.message}`;

        if (apiStatus.innerHTML === notExistEmailText) {
          emailInput.classList.add('error-input');
        } else if (apiStatus.innerHTML === incorrectPassText) {
          passwordInput.classList.add('error-input');
        }
      }
    });
};

export const loginAfterRegistration = (username: string, password: string): void => {
  fetch(`${loginURL}&username=${username}&password=${password}`, requestOptions)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('refresh', res.refresh_token);
      localStorage.setItem('type_of_token', 'customer');
    });
};
