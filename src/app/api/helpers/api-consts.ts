const accessToken = localStorage.token_info ? JSON.parse(localStorage.token_info).access_token : '';

export default accessToken;
