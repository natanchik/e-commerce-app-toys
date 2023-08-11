import { emailRequirements, passwordRequirements, validTemplates } from './constants';

export const showErrorMessage = (input: HTMLInputElement, notation: HTMLParagraphElement, message: string): void => {
  input.classList.add('error-input');
  notation.innerHTML = `<p class='error-warn'>&#9888;</p>${message}`; //`<span class='error-icon'></span> ${message}`;
};

export const validateInput = (input: HTMLInputElement, notation: HTMLParagraphElement): void => {
  let warnings = '';
  if (input.id === 'email' && !input.value.match(/^\w+@(\w){2,}\.(\w){2,4}$/)) {
    warnings += '<p>Email address must be properly formatted (e.g., user@example.com).</p>';
    if (input.value.match(/^[\w.-]+@/)) {
      warnings += '<p>Email address must contain a domain name (e.g., example.com).</p>';
    }
    emailRequirements.forEach((entries) => {
      if (!input.value.match(entries[0])) {
        warnings += entries[1];
      }
    });
  } else if (input.id === 'password') {
    passwordRequirements.forEach((entries) => {
      if (!input.value.match(entries[0])) {
        warnings += entries[1];
      }
    });
  } else {
    const id = input.id.startsWith('billing' || 'shipping') ? input.id.split('-')[1] : input.id;
    const fields = Object.keys(validTemplates);
    if (fields.includes(id)) {
      const ind = fields.indexOf(id);
      const fieldRequirements = Object.entries(validTemplates)[ind][1];
      if (!input.value.match(fieldRequirements[0])) {
        warnings += fieldRequirements[1];
      }
    }
  }

  if (warnings) {
    showErrorMessage(input, notation, warnings);
  } else {
    input.classList.remove('error-input');
    notation.innerHTML = '';
  }
};
