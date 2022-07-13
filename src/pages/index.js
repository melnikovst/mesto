import {
  author, job, initialCards,
  buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer,
  cardEditor, cardPopupBtn,
  popupsList, bigImgPopup, settings, formValidators
} from "../utils/variables.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const renderCards = new Section({
  items: initialCards,
  renderer: (cardElement) => {
    const card = createCard(cardElement)
    renderCards.addItem(card);
  }
}, cardTemplateContainer);

const createCard = (cardElement) => {
  const card = new Card(cardElement, '#card-template', handleCardClick);
  const cardItem = card.generateCard();
  return cardItem;
};

const editCardSubmitHandler = (obj) => {
  const card = createCard(obj)
  renderCards.addItem(card);
  addCardPopup.close();
};

const setCardListener = () => {
  addCardPopup.open();
  formValidators['card-form'].resetValidation()
};

const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

const handleProfileFormSubmit = (obj) => {
  setInfo.setUserInfo(obj);
};

const openProfilePopup = () => {
  const obj = setInfo.getUserInfo();
  setInfo.getUserInfo();
  profilePopup.setInputValues(obj);
  formValidators['profile-form'].resetValidation();
  formValidators['profile-form'].disableButton();
  profilePopup.open();
};

const profilePopup = new PopupWithForm(popupProfile, handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(cardEditor, editCardSubmitHandler);
const imgPopup = new PopupWithImage(bigImgPopup);
const setInfo = new UserInfo({
  profileName: author,
  profileDescription: job
});
imgPopup.setEventListeners();

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);
cardPopupBtn.addEventListener('click', setCardListener);
buttonOpenPopupProfileEdit.addEventListener('click', openProfilePopup);
renderCards.renderItems();
