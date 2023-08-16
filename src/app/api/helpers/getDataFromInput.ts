export const getLoginData = (form: HTMLFormElement): { username: string; password: string } => {
  const { elements } = form;
  const data = Array.from(elements)
    .filter((item) => {
      if (item instanceof HTMLInputElement) {
        return !!item.name;
      }
    })
    .map((element) => {
      if (element instanceof HTMLInputElement) {
        const { name, value } = element;
        return { name, value };
      }
    });

  const username = data[0]?.value;
  const password = data[1]?.value;

  if (username && password) {
    return { username: username, password: password };
  } else {
    return { username: '', password: '' };
  }
};

// export const getRegisterData = (): { [key: string]: string } => {};
