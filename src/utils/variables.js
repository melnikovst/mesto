export const buttonOpenPopupProfileEdit = document.querySelector('.profile__title-button');
export const popupProfile = document.querySelector('.popup_type_profile-info');
export const job = document.querySelector('.profile__subtitle');
export const author = document.querySelector('.profile__title');
export const cardTemplateContainer = document.querySelector('.cards');
export const cardEditor = document.querySelector('.popup_type_card-add');
export const cardPopupBtn = document.querySelector('.profile__button');
export const bigImgPopup = document.querySelector('.popup_type_picture');
export const formsList = Array.from(document.querySelectorAll('.form'));
export const popupsList = Array.from(document.querySelectorAll('.popup'));
export const formValidators = {};
export const avatarImg = document.querySelector('.profile__image');
export const buttonOpenPopupAvatar = document.querySelector('.profile__icon_type_pencil');
export const errorLoader = document.querySelector('#errorAnimation');

export const initialCards = [
  {
    way: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    way: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    way: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    way: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    way: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    way: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__invalid-message_active'
};
