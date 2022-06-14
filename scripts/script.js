const openPopup = (item) => {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

const closePopup = (item) => {
  item.classList.remove('popup_opened');
}

const likeBtn = (evt) => {
  evt.target.classList.toggle('card__button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

const editCard = (el) => {
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

const renderCards = (el) => {
  const cardElement = editCard(el)
  cardTemplateContainer.prepend(cardElement);
}

initialCards.forEach(cardElement => renderCards(cardElement));

const editCardSubmitHandler = () => {
  const card = {
    link: cardEditorInputLink.value,
    name: cardEditorInputName.value
  };
  renderCards(card);
  cardForm.reset();
  closePopup(cardEditor);
}

const bigImage = (el) => {
  cardImage.src = el.link;
  cardTitle.textContent = el.name;
}

const renderInputs = () => {
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
}

const formSubmitHandler = () => {
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
};

const closeByEscape = (evt) => {
  const popupOpenedState = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    popupOpenedState.classList.remove('popup_opened');
  }
  document.removeEventListener('keyup', closeByEscape);
}

const closePopupByClick = (evt, item) => {
  if ((evt.target.classList.contains('popup__button-escape')) || (evt.target.classList.contains('popup'))) {
    closePopup(item);
  }
};

document.addEventListener('mousedown', (evt) => {
  const buttonsCondition = evt.target.classList.contains('popup__button-escape');
  const conditions = {
    conditionProfile: (evt.target.classList.contains('popup_type_profile-info') || buttonsCondition),
    conditionAddCard: (evt.target.classList.contains('popup_type_card-add') || buttonsCondition),
    conditionImagePreview: (evt.target.classList.contains('popup_type_picture') || buttonsCondition)
  };
  if (conditions.conditionProfile) {
    closePopupByClick(evt, popup);
  }
  if (conditions.conditionAddCard) {
    closePopupByClick(evt, cardEditor);
  }
  if (conditions.conditionImagePreview) {
    closePopupByClick(evt, bigImgPopup);
  }
});

cardPopupBtn.addEventListener('click', () => {
  removeErrorsOpenedPopups(cardEditor);
  openPopup(cardEditor);
  cardForm.reset();
  disableButton(cardButton, settings);
});

popupOpened.addEventListener('click', () => {
  removeErrorsOpenedPopups(popup);
  openPopup(popup);
  renderInputs();
});

profileForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', editCardSubmitHandler);
