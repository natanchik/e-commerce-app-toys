import { ValidTemplates } from '../types/types';

export const categories = {
  'Shop by stage': ['Baby Toys: 0-12M', ' Toddler: 1-3 Years', 'Pre-School: 3-5 Years', 'School Age: 5 Years +'],
  'Imaginative Play': ['Play Kitchens & Shops', 'Role Play & Dress Up', 'Play Cars, Trains & Transport'],
  'Educational Toys': ['Montessori Toys', 'Shape Sorters', 'Games & Puzzles', 'Musical Instruments'],
  'Outdoor Play': ['Sand & Water Play', 'Bikes, Trikes & Scooters', 'Garden Play & Discovery'],
};

export const countries = { '': '', 'United States': 'US', Kazakhstan: 'KZ' };

export const salutation = { '': '', Mr: 'Mr', Mrs: 'Mrs' };

export const validTemplates: ValidTemplates = {
  firstName: [/^[a-zA-Z]+$/, 'Must contain at least one character (use a-z, A-Z) and no special characters or numbers'],
  lastName: [/^[a-zA-Z]+$/, 'Must contain at least one character (use a-z, A-Z) and no special characters or numbers'],
  streetName: [/^[a-zA-Z0-9-]+$/, 'Must contain at least one character (use a-z, A-Z, 0-9, -)'],
  city: [/^[a-zA-Z-]+$/, 'Must contain at least one character (use a-z, A-Z, -) and no special characters or numbers'],
};

export const emailRequirements: [RegExp, string][] = [
  [/.{6,}/, 'Email address must be at least 6 characters long.'],
  [/@/, '<p>Email address must contain an "@" symbol separating local part and domain name.</p>'],
  [/^[^ ]*$/, '<p>Email address must not contain whitespace.</p>'],
  [/^[a-zA-Z0-9.@]*$/, 'Email address contains incorrect symbol (use a-z, A-Z, 0-9, .@).'],
];

export const passwordRequirements: [RegExp, string][] = [
  [/.{8,}/, 'Password must be at least 8 characters long.'],
  [/^[a-zA-Z0-9!@#$%^&*_+=/?.,~:;-]*$/, 'Password contains incorrect symbol (use a-z, A-Z, 0-9, !@#$%^&*_+=/?.,~:;-).'],
  [/[a-z]/, '<p>Password must contain at least one lowercase letter (use a-z).</p>'],
  [/[A-Z]/, '<p>Password must contain at least one uppercase letter (use A-Z).</p>'],
  [/[0-9]/, '<p>Password must contain at least one digit (0-9).</p>'],
  [/[!@#$%^&*_+=/?.,~:;-]/, '<p>Password must contain at least one special character (use !@#$%^&*_+=/?.,~:;-).</p>'],
  [/^[^ ]*$/, '<p>Password must not contain whitespace.</p>'],
];
