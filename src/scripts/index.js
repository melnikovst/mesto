import {
  profileValidation, cardValidation, nameInput, author, job, jobInput, initialCards,
  buttonOpenPopupProfileEdit, popupProfile, cardEditor, cardPopupBtn,
  cardEditorInputName, cardEditorInputLink, cardForm, popupsList, bigImgPopup, profileBtn, cardButton, listElement, buttonsObj
} from "./variables.js";
import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import '../pages/index.css'
import { Slider } from "./Slider.js";

const imgPopup = new PopupWithImage(bigImgPopup);
const container = document.querySelector('.card-container')


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
}, container);

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
  container.prepend(cardItem);
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
  profileName: author,
  profileDescription: job
});

const handleProfileFormSubmit = (obj) => {
  setInfo.setUserInfo(obj);
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

const editSlider = new Slider(listElement, buttonsObj, container, throttling);

editSlider.setButtonsEventListeners();

function throttling(someFunc, timeout) {
  let timer = null;
  return function perform(...args) {
    if (timer) return
    timer = setTimeout(() => {
      someFunc(...args);
      clearTimeout(timer);
      timer = null
    }, timeout);
  };
}

const cardSection = document.querySelector('.cards');
const navigateContainer = document.querySelector('.navigate-buttons')
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    cardSection.classList.add('card-flex');
    navigateContainer.style.display = 'flex';
    buttonsObj.next.style.display = 'block';
    gridBtn.style.visibility = 'visible';
    flexBtn.style.visibility = 'hidden';
  }
  if (window.innerWidth < 900) {
    container.removeAttribute('style', 'transform')
    cardSection.classList.remove('card-flex');
    buttonsObj.next.style.display = 'none';
    navigateContainer.style.display = 'none';
  }
})

const gridBtn = document.querySelector('.grid')
const flexBtn = document.querySelector('.flex')

gridBtn.addEventListener('click', () => {
  container.removeAttribute('style', 'transform');
  container.classList.remove('card-flex');
  container.style.display = 'grid';
  buttonsObj.next.style.display = 'none';
  buttonsObj.prev.style.display = 'none';
  flexBtn.style.visibility = 'visible';
  gridBtn.style.visibility = 'hidden'
})

flexBtn.addEventListener('click', () => {
  if (container.style.display = 'grid') {
    container.style.display = 'flex';
    buttonsObj.next.style.display = 'block';
    buttonsObj.prev.style.display = 'block';
    gridBtn.style.visibility = 'visible';
    flexBtn.style.visibility = 'hidden';
  }
})

window.addEventListener('DOMContentLoaded', () => {
  flexBtn.style.visibility = 'hidden';
})

console.log(window.innerWidth)
console.log(container)
