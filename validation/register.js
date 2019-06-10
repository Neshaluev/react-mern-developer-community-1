const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Имя должно быть от 2 до 30 символов';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Имя поля обязательно для заполнения';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email обязателен для заполнения';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email недопустим';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Поле пароля обязательно для заполнения';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Пароль должен содержать не менее 6 символов';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Поле для подтверждения пароля обязательно';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Пароли должны совпадать';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
