export const buttonOpenPopupProfileEdit = document.querySelector('.profile__title-button');
export const job = document.querySelector('.profile__subtitle');
export const author = document.querySelector('.profile__title');
export const cardPopupBtn = document.querySelector('.profile__button');
export const formsList = Array.from(document.querySelectorAll('.form'));
export const popupsList = Array.from(document.querySelectorAll('.popup'));
export const formValidators = {};
export const avatarImg = document.querySelector('.profile__image');
export const buttonOpenPopupAvatar = document.querySelector('.profile__substrate');
export const errorLoader = document.querySelector('#errorAnimation');
export const loading = document.querySelector('.substrate')
export const spinner = document.querySelector('.spinner');

export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__invalid-message_active'
};
