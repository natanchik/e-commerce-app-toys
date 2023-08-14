// TODO remove this eslint-disable
import userState from '../../state/userState';
import { getAllCustomersEmails } from './getAllCustomers';
import { fillUserState } from './getCustomerByID';

/* eslint-disable no-console */
const myHeaders = {
  Authorization: 'Basic bVg4MUEzUXA5OFJnOVphdU5zakwxVFJWOm94ZnI3dXdxTkplTWJIZFRXUFJHUFBIcVU1ZWlPSlVy',
};

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: '',
};

// TODO take raw data from login form
const raw = {
  username: 'NewCustomer@example.com',
  password: 'secret1234',
};

export const loginCustomer = (username = raw.username, password = raw.password): void => {
  fetch(
    `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token?grant_type=password&username=${username}&password=${password}`,
    requestOptions,
  )
    .then(async (res) => {
      if (res.headers.get('content-type') !== 'application/json; charset=utf-8') {
        const error = new Error('Incorrect response from the server, please try later');
        throw error;
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        const existedEmails = (await getAllCustomersEmails()) as string[];
        switch (res.status) {
          case 400:
            if (existedEmails.indexOf(username) === -1) {
              throw new Error(`The email address doesn't exist, please enter correct one`);
            } else {
              throw new Error(`The password you entered is incorrect, please try again`);
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
      console.log(userState);
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    });
};

export const loginAfterRegistration = (username: string, password: string): void => {
  fetch(
    `https://auth.australia-southeast1.gcp.commercetools.com/oauth/ecommerce-application-jsfe2023/customers/token?grant_type=password&username=${username}&password=${password}`,
    requestOptions,
  )
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
    })
    .catch((err) => {
      if (err instanceof Error) {
        // TODO function() {create or fill message box for error}
        console.log(`${err.message}`);
      }
    });
};
