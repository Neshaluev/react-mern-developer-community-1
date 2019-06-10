const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Поле должности обязательно для заполнения';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Поле компании обязательно для заполнения';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'С поля даты обязательно для заполнения';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
