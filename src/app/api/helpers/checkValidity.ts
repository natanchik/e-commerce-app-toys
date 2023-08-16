const checkValidity = (): boolean => {
  const errorBlocks = document.querySelectorAll('.error-message');
  const booleanValues: boolean[] = [];

  errorBlocks.forEach((item) => {
    if (item.innerHTML === '') {
      booleanValues.push(true);
    } else {
      booleanValues.push(false);
    }
  });

  if (booleanValues.indexOf(false) === -1) {
    return true;
  } else {
    return false;
  }
};

export default checkValidity;
