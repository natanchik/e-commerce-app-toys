/* eslint-disable no-console */
const myHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

export const getAllCustomers = (): void => {
  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  )
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw new Error(`The error with status code ${res.status} has occured, please try later`);
      }
    })
    .then((res) => console.log(res))
    .catch((err) => {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    });
};

export const getAllCustomersEmails = async (emails: string[] = []): Promise<string[] | void> => {
  await fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
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
      res.results.forEach((customer: { [key: string]: string }) => {
        emails.push(customer.email);
      });
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    });

  return emails;
};
