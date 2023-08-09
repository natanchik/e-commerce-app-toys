export const createElement = (tag: string, classes: string[], text?: string): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;
  element.classList.add(...classes);
  if (text) element.innerHTML = text;

  return element;
};

export const createInputElement = (
  type: string,
  labelText: string,
  inputId: string,
  page: string,
  required: boolean = true,
  attributes?: object,
): HTMLDivElement => {
  const label = createElement('label', [`${page}-label`], labelText);
  label.setAttribute('for', inputId);

  const input = createElement('input', [`${page}-input`]) as HTMLInputElement;
  input.setAttribute('type', type);
  input.setAttribute('id', inputId);
  if (required) {
    input.required = true;
  }
  if (attributes) {
    Object.entries(attributes).forEach((entry) => input.setAttribute(entry[0], entry[1]));
  }

  const inputBlock = createElement('div', [`${page}-item`]) as HTMLDivElement;
  inputBlock.append(label, input);

  return inputBlock;
};

export const createSelectElement = (
  list: string[],
  labelText: string,
  inputId: string,
  page: string,
  required: boolean = true,
): HTMLDivElement => {
  const label = createElement('label', [`${page}-label`], labelText);
  label.setAttribute('for', inputId);

  const dataList = document.createElement('select');
  dataList.classList.add(`${page}-input`);
  dataList.setAttribute('id', inputId);
  if (required) {
    dataList.required = true;
  }

  for (let i = 0; i < list.length; i += 1) {
    const option = document.createElement('option');
    option.value = list[i];
    option.textContent = list[i];
    dataList.append(option);
  }

  const selectBlock = createElement('div', [`${page}-item`]) as HTMLDivElement;
  selectBlock.append(label, dataList);

  return selectBlock;
};

export const createCheckBoxElement = (
  labelText: string,
  inputId: string,
  required: boolean = false,
): HTMLDivElement => {
  const label = createElement('label', ['checkbox-label'], labelText);
  label.setAttribute('for', inputId);

  const input = createElement('input', ['checkbox-input']) as HTMLInputElement;
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', inputId);
  if (required) {
    input.required = true;
  }

  const checkBoxBlock = createElement('div', ['checkbox-block']) as HTMLDivElement;
  checkBoxBlock.append(input, label);

  return checkBoxBlock;
};

export const showErrorMessage = (inputBlock: HTMLDivElement, message: string): void => {
  const messageEl = createElement('p', ['error-message'], message);
  inputBlock.append(messageEl);
  const input = inputBlock.querySelector('.login-input');
  input?.classList.add('error-input');
  setTimeout(() => {
    input?.classList.remove('error-input');
  }, 3000);
};
