export const buttonOpenPopupProfileEdit = document.querySelector('.profile__title-button');
export const popupProfile = document.querySelector('.popup_type_profile-info');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
export const job = document.querySelector('.profile__subtitle');
export const author = document.querySelector('.profile__title');
export const cardTemplate = document.querySelector('#card-template');
export const cardTemplateContainer = document.querySelector('.cards');
export const cardEditor = document.querySelector('.popup_type_card-add');
export const cardPopupBtn = document.querySelector('.profile__button');
export const cardEditorInputName = document.querySelector('.form__input_type-name');
export const cardEditorInputLink = document.querySelector('.form__input_type-link');
export const cardForm = document.querySelector('.form_popup_template');
export const profileForm = document.querySelector('.form_type_profile');
export const bigImgPopup = document.querySelector('.popup_type_picture');
export const cardImage = document.querySelector('.popup__image-item');
export const cardTitle = document.querySelector('.popup__image-subtitle');
export const cardButton = document.querySelector('#card-button');
export const popupsList = Array.from(document.querySelectorAll('.popup'));
export const profileBtn = document.querySelector('#profile-button');
export const formsList = Array.from(document.querySelectorAll('.form'));

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
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
