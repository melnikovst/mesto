const popupOpened = document.querySelector('.profile__title-button');
const popup = document.querySelector('.popup');
const popupClosed = document.querySelector('.popup__button-escape');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const job = document.querySelector('.profile__subtitle');
const author = document.querySelector('.profile__title');
const cardTemplate = document.querySelector('#card-template');
const cardTemplateContainer = document.querySelector('.cards');
const cardEditor = document.querySelector('.popup_type_card-add');
const cardPopupBtn = document.querySelector('.profile__button');
const cardEditorInputName = document.querySelector('.form__input_type-name');
const cardEditorInputLink = document.querySelector('.form__input_type-link');
const cardForm = document.querySelector('.form_popup_template');
const profileForm = document.querySelector('.form__profile')
const bigImgPopup = document.querySelector('.popup_type_picture');
const cardImage = document.querySelector('.popup__image-item');
const cardTitle = document.querySelector('.popup__image-subtitle');
const cardButton = document.querySelector('#card-button');

const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__invalid-message_active'
};

const initialCards = [
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
