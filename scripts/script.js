const popupOpened = document.querySelector('.profile__title-button');
const popup = document.querySelector('.popup');
const popupClosed = document.querySelector('.popup__button-escape');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const job = document.querySelector('.profile__subtitle');
const author = document.querySelector('.profile__title');
const cardTemplate = document.querySelector('#card-template');
const cardTemplateItem = document.querySelector('.card');
const cardTemplateContainer = document.querySelector('.cards');
const cardEditor = document.querySelector('.popup_type_card-add');
const cardPopupBtn = document.querySelector('.profile__button');
const cardClosingBtn = document.querySelector('.popup__button-escape_card');
const cardEditorInputName = document.querySelector('.form__input_type-name');
const cardEditorInputLink = document.querySelector('.form__input_type-link');
const cardForm = document.querySelector('.form_popup_template');
const bigImg = document.querySelector('.popup__image-item');
const bigImgPopup = document.querySelector('.popup_type_picture');
const bigImgPopupClosing = document.querySelector('.popup__button-escape_image');
const cardImage = document.querySelector('.popup__image-item');
const cardTitle = document.querySelector('.popup__image-subtitle');
const inputEl = document.querySelectorAll('.form__input');
const inputElement = document.querySelector('.form__input');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const checkInvalidInputs = (inputList) => {
  inputList.some(input => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (checkInvalidInputs(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } 
  else {
    buttonElement.removeAttribute('disabled', '');
  }
}

function editCard(el) {
  const cardItem = cardTemplate.content;
  const cardElement = cardItem.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = el.link;
  cardImage.alt = el.name;
  cardElement.querySelector('.card__title').textContent = el.name;
  cardElement.querySelector('.card__button').addEventListener('click', likeBtn);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openPopup(bigImgPopup);
    bigImage(el);
  });
  closePopup(bigImgPopup);
  return cardElement;
}

const isProfileInputsValid = (formElement, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formElement, inputEl, inputEl.validationMessage);
  }
  else {
    hideInputError(formElement, inputEl);
  }
};

const showInputError = (formElement, inputEl, errorMessage) => {
  const span = document.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add('form__input_type_error');
  span.textContent = errorMessage;
  span.classList.add('form__invalid-message_active');
}

const hideInputError = (formElement, inputEl) => {
  const span = document.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove('form__input_type_error');
  span.classList.add('form__invalid-message_active');
  span.textContent = '';
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      isProfileInputsValid(formElement, inputEl);
      toggleButtonState(inputList, buttonElement);
});
  });
};

initialCards.forEach(function (cardElement) {
  renderCards(cardElement);
});

function renderCards(el) {
  const cardElement = editCard(el)
  cardTemplateContainer.prepend(cardElement);
}

function editCardSubmitHandler(evt) {
  evt.preventDefault();
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  renderCards(card);
  cardForm.reset();
  closePopup(cardEditor);
}

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

const closeByEscape = (evt) => {
  const popupOpenedState = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    popupOpenedState.classList.remove('popup_opened');
  }
} 

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function bigImage(el) {
  cardImage.src = el.link;
  cardTitle.textContent = el.name;
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function likeBtn(evt) {
  evt.target.classList.toggle('card__button_active');
}

function renderInputs() {
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
};

bigImgPopupClosing.addEventListener('click', () => {
  closePopup(bigImgPopup);
});
cardClosingBtn.addEventListener('click', () => {
  closePopup(cardEditor);
});
cardPopupBtn.addEventListener('click', () => {
  openPopup(cardEditor);
});
popupOpened.addEventListener('click', () => {
  openPopup(popup);
  renderInputs();
});
popupClosed.addEventListener('click', () => {
  closePopup(popup);
});
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      formSubmitHandler(evt);
    });
    setEventListeners(formElement);
  });
}; 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

cardForm.addEventListener('submit', editCardSubmitHandler);
