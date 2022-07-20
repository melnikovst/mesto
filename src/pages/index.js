import {
  author, job, initialCards,
  buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer,
  cardEditor, cardPopupBtn,
  popupsList, bigImgPopup, settings, formValidators, avatarImg
} from "../utils/variables.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import Api from "../components/Api.js";
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
  server.addCard(obj)
  .then(res => res.json())
  .then(item => {
    console.log(item);
    renderCards.addItem(createCard(item));
    addCardPopup.close();
  })
};

const setCardListener = () => {
  addCardPopup.open();
  formValidators['card-form'].resetValidation();
};

const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

const handleProfileFormSubmit = (obj) => {
  server.changeProfile(obj)
  .then(res => res.json())
  .then(submit => {
    console.log(submit)
    setInfo.setUserInfo(submit);
  }).catch(err => console.log(err));
};

const openProfilePopup = () => {
  const obj = setInfo.getUserInfo();
  setInfo.getUserInfo();
  profilePopup.setInputValues(obj);
  formValidators['profile-form'].resetValidation();
  formValidators['profile-form'].disableButton();
  profilePopup.open();
};

const server = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
    'Content-Type': 'application/json'
  }
});


server.loadCards().then(res => res.json()).then(cards => {
  console.log(cards);
  renderCards.renderItems(cards);
})

server.loadProfile().then(res => res.json()).then(profile => {
  author.textContent = profile.name;
  job.textContent = profile.about;
  avatarImg.src = profile.avatar;
})

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
