export const createElement = (tag: string, classes: string[], text?: string): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;
  element.classList.add(...classes);
  if (text) element.innerHTML = text;

  return element;
};

export const createInputElement = (
  type: string,
  text: string,
  id: string,
  parent: HTMLElement,
  page: string,
): void => {
  const inputBlock = createElement('div', [`${page}-item`]);
  const input = createElement('input', [`${page}-input`]) as HTMLInputElement;
  input.setAttribute('type', type);
  input.setAttribute('id', id);
  input.required = true;

  const label = createElement('label', [`${page}-label`], text);
  label.setAttribute('for', id);
  inputBlock.append(label, input);
  parent.append(inputBlock);
};
