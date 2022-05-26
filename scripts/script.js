const popupOpened = document.querySelector('.profile__title-button');
const popup = document.querySelector('.popup');
const popupClosed = document.querySelector('.popup__button-escape');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const job = document.querySelector('.profile__subtitle');
const author = document.querySelector('.profile__title');
const cardTemplate = document.querySelector('#card-template');
/* const cardTemplateItem = document.querySelector('.card'); */
const cardTemplateContainer = document.querySelector('.cards');
const cardEditor = document.querySelector('.popup_card_edit');
const cardPopupBtn = document.querySelector('.profile__button');
const cardClosingBtn = document.querySelector('.card__popup-closing');
const cardEditorInputName = document.querySelector('.card__form_input_type_name');
const cardEditorInputLink = document.querySelector('.card__form_input_type_link');
const cardForm = document.querySelector('.card__form');
const bigImg = document.querySelector('.popup__image-item');
const bigImgPopup = document.querySelector('.popup_image_edit');
const bigImgPopupClosing = document.querySelector('.popup__image_close_button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function editCard(el) {
  const cardItem = cardTemplate.content;
  const cardElement = cardItem.cloneNode(true);
  cardElement.querySelector('.card__image').src = el.link;
  cardElement.querySelector('.card__image').alt = el.name;
  cardElement.querySelector('.card__title').textContent = el.name;
  cardTemplateContainer.prepend(cardElement);
  cardLike();
  cardDeleting();
  cardPopupClosing();
  imgPopup();
}

function editCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardItem = cardTemplate.content;
  const cardElement = cardItem.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardEditorInputLink.value;
  cardElement.querySelector('.card__image').alt = cardEditorInputName.value;
  cardElement.querySelector('.card__title').textContent = cardEditorInputName.value;
  cardTemplateContainer.prepend(cardElement);
  cardForm.reset();
  cardLike();
  cardDeleting();
  cardPopupClosing();
  imgPopup();
}

initialCards.forEach(function (el) {
  return editCard(el);
});

function imagePopup() {
  bigImgPopup.classList.add('popup_opened');
}

function imagePopupClose() {
  bigImgPopup.classList.remove('popup_opened');
}

function bigImage(evt) {
  document.querySelector('.popup__image-item').src = evt.src;
  document.querySelector('.popup__image-subtitle').textContent = evt.alt;
}

function imgPopup() {
  const image = document.querySelectorAll('.card__image');
  image.forEach(function (el) {
    el.addEventListener('click', function () {
      imagePopup();
      bigImage(el);
    });
  });
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function cardDeleting() {
  const cardDelete = document.querySelectorAll('.card__delete-button');
  cardDelete.forEach(function (el) {
    el.addEventListener('click', deleteCard);
  });
}

function likeBtn(evt) {
  evt.target.classList.toggle('card__button_active');
}

function cardLike() {
  const like = document.querySelectorAll('.card__button');
  like.forEach(function (el) {
    el.addEventListener("click", likeBtn);
  });
};

function cardpopup() {
  cardEditor.classList.add('popup_opened');
}

function cardPopupClosing() {
  cardEditor.classList.remove('popup_opened');
}

function open() {
  popup.classList.add('popup_opened');
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
};

function close() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  close();
};

bigImgPopupClosing.addEventListener('click', imagePopupClose);
cardClosingBtn.addEventListener('click', cardPopupClosing);
cardPopupBtn.addEventListener('click', cardpopup);
popupOpened.addEventListener('click', open);
popupClosed.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', editCardSubmitHandler);

