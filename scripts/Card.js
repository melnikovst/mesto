export class Card {
  constructor(initialCards, cardSelector, handleCardClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardItem = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardItem;
  }

  generateCard() {
    this._item = this._getElement();
    this._item.querySelector('.card__title').textContent = this._name;
    const cardImg = this._item.querySelector('.card__image');
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._setListeners();
    return this._item;
  }

  _setListeners() {
    this._cardButton = this._item.querySelector('.card__button');
    this._cardButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._item.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleting();
    });
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _handleLike() {
    this._cardButton.classList.toggle('card__button_active');
  }

  _handleDeleting() {
    this._item.remove();
    this._item = null;
  }
}
