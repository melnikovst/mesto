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
const cardEditor = document.querySelector('.popup_template_edit');
const cardPopupBtn = document.querySelector('.profile__button');
const cardClosingBtn = document.querySelector('.popup__template-closing');
const cardEditorInputName = document.querySelector('.form__input_type-name');
const cardEditorInputLink = document.querySelector('.form__input_type-link');
const cardForm = document.querySelector('.form_popup_template');
const bigImg = document.querySelector('.popup__image-item');
const bigImgPopup = document.querySelector('.popup_image_edit');
const bigImgPopupClosing = document.querySelector('.popup__button-escape_image');
const cardImage = document.querySelector('.popup__image-item');
const cardTitle = document.querySelector('.popup__image-subtitle');

function editCard(el) {
  const cardItem = cardTemplate.content;
  const cardElement = cardItem.querySelector('.card').cloneNode(true);
  const image = document.querySelector('.card__image');
  cardElement.querySelector('.card__image').src = el.link;
  cardElement.querySelector('.card__image').alt = el.name;
  cardElement.querySelector('.card__title').textContent = el.name;
  cardTemplateContainer.prepend(cardElement);
  cardElement.querySelector('.card__button').addEventListener('click', likeBtn);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openPopup(bigImgPopup);
    bigImage(el);
  });
  closePopup(bigImgPopup);
}

initialCards.forEach(function (el) {
  return editCard(el);
});

function editCardSubmitHandler(evt) {
  evt.preventDefault();
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  editCard(card);
  cardForm.reset();
  closePopup(cardEditor);
}

function openPopup(item) {
  item.classList.add('popup_opened');
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
formElement.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', editCardSubmitHandler);