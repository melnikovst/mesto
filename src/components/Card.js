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
    this._cardImg = this._item.querySelector('.card__image');
    this._cardTitle = this._item.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._setListeners();
    return this._item;
  }
  
  _setListeners() {
    this._likeButton = this._item.querySelector('.card__button');
    this._likeButton.addEventListener('click', () => {
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
    this._likeButton.classList.toggle('card__button_active');
  }

  _handleDeleting() {
    this._item.remove();
    this._item = null;
  }
}
