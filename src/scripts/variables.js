import { FormValidator } from "./FormValidator.js";

export const buttonOpenPopupProfileEdit = document.querySelector('.profile__title-button');
export const popupProfile = document.querySelector('.popup_type_profile-info');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
export const job = document.querySelector('.profile__subtitle');
export const author = document.querySelector('.profile__title');
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
    name: 'Файолет-Тюрме',
    link: 'https://images.unsplash.com/photo-1655032827680-1c5acdc6dea4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Порто',
    link: 'https://images.unsplash.com/photo-1655063971080-a96a49fa8a51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Langkawi skybridge, Малайзия',
    link: 'https://images.unsplash.com/photo-1657462912343-eff2e51b8e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Лувр, Франция',
    link: 'https://images.unsplash.com/photo-1657420228473-e3fee079626b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    name: 'Альпы',
    link: 'https://images.unsplash.com/photo-1657382451966-3448f72ea564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80'
  },
  {
    name: 'Колизей, Рим',
    link: 'https://images.unsplash.com/photo-1656541314159-a2631f5b8c1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Рио-де-Жанейро, Бразилия',
    link: 'https://images.unsplash.com/photo-1656989048329-4226c441e501?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80'
  },
  {
    name: 'Казанский собор, Казань',
    link: 'https://images.unsplash.com/photo-1655404474510-8ece3da2884b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  },
  {
    name: 'Сидней, Австралия',
    link: 'https://images.unsplash.com/photo-1656893239772-d75e35ea379b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Гонконг, Китай',
    link: 'https://images.unsplash.com/photo-1656465344734-94056634db85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1322&q=80'
  },
  {
    name: 'Амстердам, Нидерланды',
    link: 'https://images.unsplash.com/photo-1656488551854-58448c688008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80'
  },
];

export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__invalid-message_active'
};

export const profileValidation = new FormValidator(settings, profileForm);
export const cardValidation = new FormValidator(settings, cardForm);
