import {
  profileValidation, cardValidation, nameInput, author, job, jobInput, initialCards,
  buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer, cardEditor, cardPopupBtn,
  cardEditorInputName, cardEditorInputLink, cardForm, popupsList, bigImgPopup, profileBtn, cardButton
} from "./variables.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import '../pages/index.css'

const imgPopup = new PopupWithImage(bigImgPopup);


const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const renderCards = new Section({
  items: initialCards,
  renderer: (cardElement) => {
    const card = new Card(cardElement, '#card-template', handleCardClick);
    const cardEl = card.generateCard();
    renderCards.addItem(cardEl);
  }
}, cardTemplateContainer);

imgPopup.setEventListeners();

const createCard = (cardElement) => {
  const card = new Card(cardElement, '#card-template', handleCardClick);
  const cardItem = card.generateCard();
  return cardItem;
};

const editCardSubmitHandler = () => {
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  const cardItem = createCard(card);
  cardTemplateContainer.prepend(cardItem);
  addCardPopup.close();
};

const setCardListener = () => {
  addCardPopup.open();
  cardForm.reset();
  cardValidation.resetValidation();
};

profileValidation.enableValidation();
cardValidation.enableValidation();

const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

const setInfo = new UserInfo({
  authorSelector: author,
  profileDescription: job
});

const handleProfileFormSubmit = (obj) => {
  setInfo.setUserInfo(obj);
  console.log(obj)
};

const setProfileListener = () => {
  setInfo.getUserInfo();
  popupFormHandler.open();
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
  profileValidation.resetValidation();
  profileValidation.disableButton();
};

const popupFormHandler = new PopupWithForm(popupProfile, handleProfileFormSubmit);
popupFormHandler.setEventListeners();
const addCardPopup = new PopupWithForm(cardEditor, editCardSubmitHandler);
addCardPopup.setEventListeners();

window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);
cardPopupBtn.addEventListener('click', setCardListener);
buttonOpenPopupProfileEdit.addEventListener('click', setProfileListener);
profileBtn.addEventListener('submit', handleProfileFormSubmit);
cardButton.addEventListener('submit', editCardSubmitHandler);
renderCards.renderItems();