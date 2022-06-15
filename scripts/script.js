const openPopup = (item) => {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

const closePopup = (item) => {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

const likeBtn = (evt) => {
  evt.target.classList.toggle('card__button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

const createCard = (el) => {
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
    openPopupImage(el);
  });
  return cardElement;
};

const renderCard = (el) => {
  const cardElement = createCard(el)
  cardTemplateContainer.prepend(cardElement);
};

initialCards.forEach(cardElement => renderCard(cardElement));

const editCardSubmitHandler = () => {
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  renderCard(card);
  cardForm.reset();
  closePopup(cardEditor);
};

const openPopupImage = (el) => {
  cardImage.src = el.link;
  cardTitle.textContent = el.name;
  cardImage.alt = el.name;
};

const renderInputs = () => {
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
};

const handleProfileFormSubmit = () => {
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
};

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-escape')) {
    const popup = evt.target.closest('.popup_opened');
    closePopup(popup);
  }
};

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
