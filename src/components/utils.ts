export const createElement = (tag: string, classes: string[], text?: string): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;
  element.classList.add(...classes);
  if (text) element.innerHTML = text;

  return element;
};
