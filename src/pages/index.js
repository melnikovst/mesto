import {
  author, job,
  buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer,
  cardEditor, cardPopupBtn,
  popupsList, bigImgPopup, settings, formValidators, avatarImg, buttonOpenPopupAvatar, errorLoader
} from "../utils/variables.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import Api from "../components/Api.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";

const server = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
    'Content-Type': 'application/json'
  }
});

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
    profileowner.setUserAvatar(link)
  })
}
enableValidation(settings);

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const handleTrashImg = (object) => {
  deletePopup.open();
  deletePopup.getCardObject(object);
}

const popupDeleting = document.querySelector('.popup_type_submit');



const editCardSubmitHandler = (obj) => {
  console.log(obj);
  server.addCard(obj)
    .then(item => {
      renderCards.addItem(createCard(item));
      addCardPopup.close();
    })
};

const createCard = (cardElement) => {
  const card = new Card(cardElement, '#card-template', handleCardClick, handleTrashImg, { userId: profileowner.getUserId() }, putLikeThroughApi,
    deleteLikeThroughApi);
  const cardItem = card.generateCard();
  return cardItem;
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
/*     .then((res) => {
      profileowner.setUserInfo(res);
      console.log(res);
    }).catch(err => console.log(err)); */
};

const openProfilePopup = () => {
  const obj = profileowner.getUserInfo();
  profileowner.getUserInfo();
  profilePopup.setInputValues(obj);
  formValidators['profile-form'].resetValidation();
  formValidators['profile-form'].disableButton();
  profilePopup.open();
};

const handleAvatarOpening = () => {
  formValidators['avatar-form'].resetValidation();
  formValidators['avatar-form'].disableButton();
  avatarPopup.open();
  console.log(deletePopup)
}

const deleteCardThroughApi = (object) => {
  server.deleteCard(object.sendCard()).then(res => res.json()).then(() => { object.handeDeleting() });
}

const deleteLikeThroughApi = (object) => {
  return server.deleteLike(object)
}

const putLikeThroughApi = (object) => {
  return server.putLike(object)
}

const renderCards = new Section({
  renderer: cardElement => {
    const card = createCard(cardElement)
    renderCards.addItem(card);
  }
}, cardTemplateContainer);

let profileowner;
const profilePopup = new PopupWithForm(popupProfile, handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(cardEditor, editCardSubmitHandler);
const avatarPopup = new PopupWithForm(popupAvatar, changeAvatar)
const imgPopup = new PopupWithImage(bigImgPopup);
const deletePopup = new PopupWithSubmit(popupDeleting, deleteCardThroughApi);
deletePopup.setListeners();

imgPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);
cardPopupBtn.addEventListener('click', setCardListener);
buttonOpenPopupProfileEdit.addEventListener('click', openProfilePopup);
buttonOpenPopupAvatar.addEventListener('click', handleAvatarOpening);

const loading = document.querySelector('.substrate')

Promise.all([server.loadProfile(), server.loadCards()]).then((value) => {
  /* throw err */
  profileowner = new UserInfo({
    profileName: author,
    profileDescription: job,
    profileAvatar: avatarImg
  }, value[0]);
  profileowner.setUserInfo(value[0]);
  renderCards.renderItems(value[1])
  loading.classList.remove('substrate_while_loading');
}).catch(() => {
  loading.classList.remove('substate_while_loading')
  errorLoader.classList.add('substrate_active');
})

