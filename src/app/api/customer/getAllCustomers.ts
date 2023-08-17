import accessToken from '../helpers/api-consts';

export const getAllCustomers = (): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(
    'https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers',
    requestOptions,
  ).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw new Error(`The error with status code ${res.status} has occured, please try later`);
    }
  });
};

export const getAllCustomersEmails = async (emails: string[] = []): Promise<string[] | void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

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
    });

  return emails;
};
