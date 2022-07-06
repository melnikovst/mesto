import { bigImgPopup, cardImage, cardTitle } from "./variables.js";
import { openPopup } from "./script.js";

export class Card {
  constructor(initialCards, cardSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardTemplate = cardSelector;
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
      this._handleImagePopup();
    })
  }

  _handleLike() {
    this._cardButton.classList.toggle('card__button_active');
  }

  _handleDeleting() {
    this._item.remove();
    this._item = null;
  }

  _handleImagePopup() {
    openPopup(bigImgPopup);
    cardImage.src = this._link;
    cardTitle.textContent = this._name;
    cardImage.alt = this._name;
  }
}
/* 
const horizontalCardList = new Section(
  {
    data: items,
    renderer: () => {
      const card = isGrid
        ? new DefaultCard(item, '.default-card')
        : new HorizontalCard(item, '.horizontal-card');

      const cardElement = card.generateCard();

      this.setItem(cardElement);
    }
  }, cardListSelector);
   */