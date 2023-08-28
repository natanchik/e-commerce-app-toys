import { QueryParam } from "../../types/types";
import { generateQueryParams } from "../helpers/utils";

const getAllCategories = (queryParams?: QueryParam[]): void => {
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.token_info).access_token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  fetch(
    `https://api.australia-southeast1.gcp.commercetools.com/ecommerce-application-jsfe2023/categories${generateQueryParams(queryParams)}`,
    requestOptions,
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error(`The error with status code ${response.status} has occured, please try later`);
      }
    })
    .then((result) => {
      localStorage.setItem('all_categories', JSON.stringify(result.results));
    });
};

export default getAllCategories;
