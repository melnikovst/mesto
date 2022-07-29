import {
  author, job,
  buttonOpenPopupProfileEdit,
  cardPopupBtn,
  popupsList, settings,
  formValidators, avatarImg,
  buttonOpenPopupAvatar, loading,
  spinner, errorLoader
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
  url: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '12b2cd52-5967-45db-990f-351ecb43e60e',
    'Content-Type': 'application/json'
  }
});

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach(formElement => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const changeAvatar = (obj) => {
  avatarImg.classList.add('profile__image_while_loading');
  spinner.classList.add('spinner_visible');
  avatarPopup.changeButtonState(true);
  return server.setNewAvatar(obj)
    .then(link => {
      profileowner.setUserInfo(link);
      avatarPopup.close();
    }).catch(err => { console.log(err) }).finally(() => {
      spinner.classList.remove('spinner_visible');
      avatarImg.classList.remove('profile__image_while_loading');
      avatarPopup.changeButtonState(false);
    })
}

enableValidation(settings);

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const handleTrashImg = (object) => {
  deletePopup.open();
  deletePopup.setCardObject(object);
}

const editCardSubmitHandler = (obj) => {
  addCardPopup.changeButtonState(true);
  return server.addCard(obj)
    .then(item => {
      renderCards.addItem(createCard(item));
      addCardPopup.close();
    }).catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      addCardPopup.changeButtonState(false);
    })
};

const renderCards = new Section({
  renderer: cardElement => {
    const card = createCard(cardElement)
    renderCards.addItem(card);
  }
}, '.cards');

let user;

const createCard = (cardElement) => {
  const card = new Card(cardElement, '#card-template', handleCardClick, handleTrashImg, {
    userId: user,
    putLike: () => {
      return server.putLike(cardElement).then(res => {
        card._checkMyOwnLikes(res);
        card._sendLike();
      })
    },
    deleteLike: () => {
      return server.deleteLike(cardElement).then(res => {
        card._checkMyOwnLikes(res);
        card._deleteLike();
      })
    }
  });
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
  profilePopup.changeButtonState(true);
  return server.changeProfile(obj)
    .then((res) => {
      profileowner.setUserInfo(res);
      profilePopup.close();
    }).catch(err => console.log(err)).finally(() => {
      profilePopup.changeButtonState(false);
    });
};

const openProfilePopup = () => {
  const obj = profileowner.getUserInfo();
  profilePopup.setInputValues(obj);
  formValidators['profile-form'].resetValidation();
  formValidators['profile-form'].disableButton();
  profilePopup.open();
};

const handleAvatarOpening = () => {
  formValidators['avatar-form'].resetValidation();
  formValidators['avatar-form'].disableButton();
  avatarPopup.open();
}

const deleteCardThroughApi = (object) => {
  server.deleteCard(object.sendCard())
    .then(() => { object.handeDeleting() });
}

const profileowner = new UserInfo({
  profileName: author,
  profileDescription: job,
  profileAvatar: avatarImg,
})

const profilePopup = new PopupWithForm('.popup_type_profile-info', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_type_card-add', editCardSubmitHandler);
const avatarPopup = new PopupWithForm('.popup_type_avatar', changeAvatar)
const imgPopup = new PopupWithImage('.popup_type_picture');
const deletePopup = new PopupWithSubmit('.popup_type_submit', deleteCardThroughApi);
deletePopup.setListeners();

imgPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);
cardPopupBtn.addEventListener('click', setCardListener);
buttonOpenPopupProfileEdit.addEventListener('click', openProfilePopup);
buttonOpenPopupAvatar.addEventListener('click', handleAvatarOpening);

Promise.all([server.loadProfile(), server.loadCards()])
  .then((value) => {
    user = value[0]._id;
    profileowner.setUserInfo(value[0]);
    renderCards.renderItems(value[1])
    loading.classList.remove('substrate_while_loading');
  }).catch(() => {
    loading.classList.remove('substate_while_loading')
    errorLoader.classList.add('substrate_active');
  })
