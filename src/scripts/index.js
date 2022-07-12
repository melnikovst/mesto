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

const listElement = document.querySelector('.card');

let cardIndex = 0;
let count = 0
const changing = throttle(changeSlide, 150)
const sliderNextBtn = document.querySelector('.slider-button-next');
const sliderPrevBtn = document.querySelector('.slider-button-prev');
document.querySelector('.slider-button-next').addEventListener('click', () => {
  changing('next');
});

function throttle(someFunc, timeout) {
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

function changeSlide(direction) {
  const listElems = document.querySelectorAll('.card');
  const slidesCount = listElems.length;
  const cardWidth = listElement.clientWidth + 20;
  if (direction === 'next') {
    cardIndex++
    if (cardIndex === slidesCount - 2) {
      cardIndex = 0;
    }
  }
  else if (direction === 'prev') {
    container.style.transform = `translateX(${cardIndex * cardWidth}px)`;
    cardIndex--
    if (cardIndex < 0) {
      cardIndex = slidesCount - 3;
    }
  }
  container.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
}

sliderPrevBtn.addEventListener('click', () => {
  changing('prev')
});

const cardSection = document.querySelector('.cards');
const navigateContainer = document.querySelector('.navigate-buttons')
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    cardSection.classList.add('card-flex');
    navigateContainer.style.display = 'flex';
    sliderNextBtn.style.display = 'block';
    gridBtn.style.visibility = 'visible';
    flexBtn.style.visibility = 'hidden';
  }
  if (window.innerWidth < 900) {
    container.removeAttribute('style', 'transform')
    cardSection.classList.remove('card-flex');
    sliderNextBtn.style.display = 'none';
    navigateContainer.style.display = 'none';
  }
})

const gridBtn = document.querySelector('.grid')
const flexBtn = document.querySelector('.flex')

gridBtn.addEventListener('click', () => {
  container.removeAttribute('style', 'transform');
  container.classList.remove('card-flex');
  container.style.display = 'grid';
  sliderNextBtn.style.display = 'none';
  sliderPrevBtn.style.display = 'none';
  flexBtn.style.visibility = 'visible';
  gridBtn.style.visibility = 'hidden'
})

flexBtn.addEventListener('click', () => {
  if (container.style.display = 'grid') {
    container.style.display = 'flex';
    sliderNextBtn.style.display = 'block';
    sliderPrevBtn.style.display = 'block';
    gridBtn.style.visibility = 'visible';
    flexBtn.style.visibility = 'hidden';
  }
})

window.addEventListener('DOMContentLoaded', () => {
  flexBtn.style.visibility = 'hidden';
})

console.log(window.innerWidth)
console.log(container)
