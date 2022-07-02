import { profileValidation, cardValidation, nameInput, author, job, jobInput, initialCards, buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer, cardEditor, cardPopupBtn, cardEditorInputName, cardEditorInputLink, cardForm, profileForm, cardButton, popupsList, profileBtn, formsList, settings } from "./variables.js";
import { Card } from "./Card.js";

export const openPopup = (item) => {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

const closePopup = (item) => {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

const createCard = (cardElement) => {
  const card = new Card(cardElement, '#card-template');
  const cardItem = card.generateCard();
  return cardItem;
};

const renderCardPrepend = (cardElement) => {
  const newCard = createCard(cardElement);
  cardTemplateContainer.prepend(newCard);
}

initialCards.forEach(cardElement => {
  renderCardPrepend(cardElement);
});

const editCardSubmitHandler = (e) => {
  e.preventDefault();
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  renderCardPrepend(card);
  cardForm.reset();
  closePopup(cardEditor);
};

const renderInputs = () => {
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
};

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenedState = document.querySelector('.popup_opened');
    closePopup(popupOpenedState);
  }
};

const setCardListener = () => {
  openPopup(cardEditor);
  cardForm.reset();
  cardValidation.resetValidation();
};

const setProfileListener = () => {
  openPopup(popupProfile);
  renderInputs();
  profileValidation.resetValidation();
  profileValidation.disableButton();
};

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-escape')) {
    closePopup(evt.currentTarget);
  }
};

profileValidation.enableValidation();
cardValidation.enableValidation();

const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);

popupsList.forEach(popup => popup.addEventListener('mousedown', closePopupByClick));

cardPopupBtn.addEventListener('click', setCardListener);

buttonOpenPopupProfileEdit.addEventListener('click', setProfileListener);

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', editCardSubmitHandler);
