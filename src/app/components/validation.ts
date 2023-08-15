import { emailRequirements, passwordRequirements, validTemplates } from './constants';

export const showErrorMessage = (input: HTMLInputElement, notation: HTMLParagraphElement, message: string): void => {
  input.classList.add('error-input');
  notation.innerHTML = `<p class='error-warn'>&#9888;</p>${message}`;
};

export const validateInput = (input: HTMLInputElement, notation: HTMLParagraphElement): void => {
  let warnings = '';
  if (input.value) {
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
    } else if (input.id === 'dateOfBirth') {
      const curDate = new Date();
      const birthdate = new Date(input.value);
      let age = curDate.getFullYear() - birthdate.getFullYear();
      const monthDiff = curDate.getMonth() - birthdate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && curDate.getDate() - birthdate.getDate() < 0)) {
        age -= 1;
      }
      if (age < 13) {
        warnings += '<p>You are too young. 13+ Only.</p>';
      }
    } else {
      const id = input.id.startsWith('shipping') || input.id.startsWith('billing') ? input.id.split('-')[1] : input.id;
      if (id === 'postalCode') {
        const country = document.getElementById(`${input.id.split('-')[0]}-country`) as HTMLInputElement;
        let reqValue = /^\d{5,6}$/;
        let reqText = 'US: 5 digits, KZ: 6 digits';
        if (country && country.value) {
          reqValue = country.value === 'US' ? /^\d{5}$/ : /^\d{6}$/;
          reqText = country.value === 'US' ? '5 digits' : '6 digits';
        }
        if (!input.value.match(reqValue)) {
          warnings += `Must follow the format for the country (${reqText})`;
        }
      } else {
        const fields = Object.keys(validTemplates);
        if (fields.includes(id)) {
          const ind = fields.indexOf(id);
          const fieldRequirements = Object.entries(validTemplates)[ind][1];
          if (!input.value.match(fieldRequirements[0])) {
            warnings += fieldRequirements[1];
          }
        }
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
