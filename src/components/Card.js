import Api from "./Api";

const deleteFromServer = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
    'Content-Type': 'application/json'
  }
});
export class Card {
  constructor(obj, cardSelector, handleCardClick) {
    this._name = obj.name;
    this._link = obj.link;
    this._cardTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
    this._obj = obj;
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
      deleteFromServer.deleteCard(this._obj).then(res => res.json()).then(() => {
        console.log(this._obj);
        this._handeDeleting();
      })
    });
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _handleLike() {
    this._likeButton.classList.toggle('card__button_active');
  }

  _handeDeleting() {
    this._item.remove();
    this._item = null;
  }
}
