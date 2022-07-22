export class Card {
  constructor(obj, cardSelector, handleCardClick, deleteCardThroughApi, id, putLike) {
    this._name = obj.name;
    this._link = obj.link;
    this._cardTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
    this._obj = obj;
    this._deleting = deleteCardThroughApi;
    this._array = obj.likes;
    this._cardOwner = obj.owner._id;
    this._item = this._getElement();
    this._likeButton = this._item.querySelector('.card__button');
    this._deletingBtn = this._item.querySelector('.card__delete-button');
    this._myId = id;
    this._id = this._myId._id;
    this._putLike = putLike;
  }

  _getElement() {
    const cardItem = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardItem;
  }

  generateCard() {
    if(this._id !== this._cardOwner) {
      this._deletingBtn.style.display = 'none';
    }
    this._likesCount = this._item.querySelector('.card__like_amount');
    this._cardImg = this._item.querySelector('.card__image');
    this._cardTitle = this._item.querySelector('.card__title');
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._likesCount.textContent = this._array.length;
    this._setListeners();
    this._checkMyOwnLikes();
    return this._item;
  }

  _setListeners() {

    this._likeButton.addEventListener('click', () => {
      console.log(this._array);
      /* this._handleLike(); */
      this._putLike(this._obj, this._sendLike());
    });
    this._item.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleting(this._obj, this._handeDeleting());
    });
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _handleLike() {
    this._likeButton.classList.toggle('card__button_active');
  }

  _sendLike() {
    this._likeButton.classList.add('card__button_active');
  }

  _deleteLike() {
    this._likeButton.classList.remove('card__button_active');
  }

  _handeDeleting() {
    this._item.remove();
    this._item = null;
  }

  _checkMyOwnLikes() {
    const result = this._checkLikesArray();
    if(result) {
      this._sendLike();
    }
    if(!result) {
      this._deleteLike();
    }
  }

  _checkLikesArray() {
    return this._array.some(item => item._id === this._id);
  }
}
