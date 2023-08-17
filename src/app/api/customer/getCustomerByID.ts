import userState from '../../state/userState';

export const getCustomerByID = async (customerID: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  await fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/customers/${customerID}`,
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
      userState.firstName = res.firstName;
      userState.lastName = res.lastName;
      userState.dateOfBirth = res.dateOfBirth;
      userState.addresses = res.addresses;
    });
};

export const fillUserState = async (email: string): Promise<void> => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      const currentCustomer = res.results.find((customer: { [key: string]: string }) => {
        return customer.email === email;
      });
      userState.firstName = currentCustomer.firstName;
      userState.lastName = currentCustomer.lastName;
      userState.dateOfBirth = currentCustomer.dateOfBirth;
      userState.addresses = currentCustomer.addresses;
    });
};
