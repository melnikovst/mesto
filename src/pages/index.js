import {
  author, job,
  buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer,
  cardEditor, cardPopupBtn,
  popupsList, bigImgPopup, settings, formValidators, avatarImg, buttonOpenPopupAvatar
} from "../utils/variables.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import Api from "../components/Api.js";

const server = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
    'Content-Type': 'application/json'
  }
});

const setInfo = new UserInfo({
  profileName: author,
  profileDescription: job,
  profileAvatar: avatarImg
}, server.getProfileId());

server.loadProfile().then(res => res.json()).then(() => {
  setInfo.setUserInfo()
})

server.loadCards().then(res => res.json()).then(cards => {
  renderCards.renderItems(cards);
})

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const popupAvatar = document.querySelector('.popup_type_avatar');

const changeAvatar = (obj) => {
  server.setNewAvatar(obj).then(res => res.json()).then(link => {
    console.log(link);
    setInfo.setUserAvatar(link)
  })
}
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
  const card = new Card(cardElement, '#card-template', handleCardClick, deleteCardThroughApi, setInfo.getUserId(), putLikeThroughApi,
    deleteLikeThroughApi);
  const cardItem = card.generateCard();
  return cardItem;
};

const editCardSubmitHandler = (obj) => {
  console.log(obj);
  server.addCard(obj)
    .then(res => res.json())
    .then(item => {
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
    .then(() => {
      setInfo.setUserInfo();
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

const deleteCardThroughApi = (object, someFunction) => {
  server.deleteCard(object).then(res => res.json()).then(() => someFunction);
}

const deleteLikeThroughApi = (object) => {
  return server.deleteLike(object)
}

const putLikeThroughApi = (object) => {
  return server.putLike(object)
}

const profilePopup = new PopupWithForm(popupProfile, handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(cardEditor, editCardSubmitHandler);
const avatarPopup = new PopupWithForm(popupAvatar, changeAvatar)
const imgPopup = new PopupWithImage(bigImgPopup);

imgPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);
cardPopupBtn.addEventListener('click', setCardListener);
buttonOpenPopupProfileEdit.addEventListener('click', openProfilePopup);
buttonOpenPopupAvatar.addEventListener('click', () => {
  avatarPopup.open();
})
