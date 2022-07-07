import { profileValidation, cardValidation, nameInput, author, job, jobInput, initialCards, 
        buttonOpenPopupProfileEdit, popupProfile, cardTemplateContainer, cardEditor, cardPopupBtn, 
        cardEditorInputName, cardEditorInputLink, cardForm, profileForm, popupsList } from "./variables.js";
import { Card } from "./Card.js";
import { Popup } from "./Popup.js";

const profileInfoPopup = new Popup(popupProfile);
const addCardPopup = new Popup(cardEditor);

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
  addCardPopup.close();
};

const renderInputs = () => {
  nameInput.value = author.textContent;
  jobInput.value = job.textContent;
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  author.textContent = nameInput.value;
  job.textContent = jobInput.value;
  profileInfoPopup.close();
};

const setCardListener = () => {
  addCardPopup.open();
  cardForm.reset();
  cardValidation.resetValidation();
};
// 
const setProfileListener = () => {
  profileInfoPopup.open();
  renderInputs();
  profileValidation.resetValidation();
  profileValidation.disableButton();
};

profileValidation.enableValidation();
cardValidation.enableValidation();

const preloadAnimationCanceling = () => {
  popupsList.forEach(popup => popup.classList.add('popup_animated'));
};

profileInfoPopup.setEventListeners();
addCardPopup.setEventListeners();

window.addEventListener('DOMContentLoaded', preloadAnimationCanceling);

cardPopupBtn.addEventListener('click', setCardListener);

buttonOpenPopupProfileEdit.addEventListener('click', setProfileListener);

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', editCardSubmitHandler);
