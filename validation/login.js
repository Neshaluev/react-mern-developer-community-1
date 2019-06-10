const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email является недопустимым';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email ошибка заполнения поле';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Пароль обязателен';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
