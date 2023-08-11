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
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.log('error', error));
};

export const getAllCustomersEmails = async (emails: string[] = []): Promise<string[] | void> => {
  await fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  )
    .then((res) => res.json())
    .then((res) => {
      res.results.forEach((customer: { [key: string]: string }) => {
        emails.push(customer.email);
      });
    })
    .catch((error) => console.log('error', error));

  return emails;
};
