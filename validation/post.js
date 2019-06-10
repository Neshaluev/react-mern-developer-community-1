const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Сообщение должно быть от 10 до 300 символов';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Текстовое поле обязательно для заполнения';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
