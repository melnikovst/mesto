import { nameInput, author, job, jobInput, initialCards, buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer, cardEditor, cardPopupBtn, cardEditorInputName, cardEditorInputLink, cardForm, profileForm, cardButton, popupsList, profileBtn, formsList, settings } from "./variables.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const hideError = (form, error, input, settings) => {
  input.classList.remove(settings.inputErrorClass);
  error.textContent = '';
  error.classList.remove(settings.errorClass);
};

const removeErrorsOpenedPopups = (form) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  inputs.forEach(input => {
    const error = form.querySelector(`.${input.id}-error`);
    hideError(form, error, input, settings);
  });
};

const disableButton = (button, settings) => {
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
};

export const openPopup = (item) => {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

const closePopup = (item) => {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

const renderCard = (cardElement) => {
  const card = new Card(cardElement);
  const cardItem = card.generateCard();
  cardTemplateContainer.prepend(cardItem);
};

initialCards.forEach(cardElement => {
  renderCard(cardElement);
});

const editCardSubmitHandler = (e) => {
  e.preventDefault();
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  renderCard(card);
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
  removeErrorsOpenedPopups(cardEditor);
  openPopup(cardEditor);
  cardForm.reset();
  disableButton(cardButton, settings);
};

const setProfileListener = () => {
  removeErrorsOpenedPopups(popupProfile);
  openPopup(popupProfile);
  renderInputs();
  disableButton(profileBtn, settings);
};

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-escape')) {
    const popup = evt.target.closest('.popup_opened');
    closePopup(popup);
  }
};

formsList.forEach(form => {
  const item = new FormValidator(settings, form);
  item.enableValidation();
});


// выключаю "мелькания" скрытых поп-апов при загрузке страницы
const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);

popupsList.forEach(popup => popup.addEventListener('mousedown', closePopupByClick));

cardPopupBtn.addEventListener('click', setCardListener);

buttonOpenPopupProfileEdit.addEventListener('click', setProfileListener);

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', editCardSubmitHandler);
