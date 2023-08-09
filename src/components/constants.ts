const categories = {
  'Shop by stage': [
    'Baby Toys: 0-12M',
    ' Toddler: 1-3 Years',
    'Pre-School: 3-5 Years',
    'School Age: 5 Years +',
  ],
  'Imaginative Play': [
    'Play Kitchens & Shops',
    'Role Play & Dress Up',
    'Play Cars, Trains & Transport',
  ],
  'Educational Toys': [
    'Montessori Toys',
    'Shape Sorters',
    'Games & Puzzles',
    'Musical Instruments',
  ],
  'Outdoor Play': ['Sand & Water Play', 'Bikes, Trikes & Scooters', 'Garden Play & Discovery'],
};

export const countries = ['', 'U.S.A.', 'Kazakhstan'];

export const salutation = ['', 'Mr', 'Mrs'];

export const validTemplates = {
  email: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2-4}$/,
  password: [/[a-z]+/, /[A-Z]+/, /\d+/],
  firstName: /^[a-zA-Z]+$/,
  lastName: /^[a-zA-Z]+$/,
  street: /^[a-zA-Z-]+$/,
  city: /^[a-zA-Z-]+$/,
  postalCode: /\d{5,6}/,
};

export default categories;
