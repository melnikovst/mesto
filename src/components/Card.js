export class Card {
  constructor(obj, cardSelector, handleCardClick, handleTrashImg, { userId, putLike, deleteLike }) {
    this._name = obj.name;
    this._link = obj.link;
    this._cardTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
    this._obj = obj;
    this._deleting = handleTrashImg;
    this._cardOwner = obj.owner._id;
    this._id = userId;
    this._putLikeWithApi = putLike;
    this._deleteLikeWithApi = deleteLike;
  }

  sendCard() {
    return this._obj;
  }

  _getElement() {
    const cardItem = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardItem;
  }

  generateCard() {
    this._item = this._getElement();
    this._likeButton = this._item.querySelector('.card__button');
    this._deletingBtn = this._item.querySelector('.card__delete-button');
    this._likesCount = this._item.querySelector('.card__like_amount');
    this._cardImg = this._item.querySelector('.card__image');
    this._cardTitle = this._item.querySelector('.card__title');
    if (this._id !== this._cardOwner) {
      this._deletingBtn.style.display = 'none';
    }
    this._cardTitle.textContent = this._obj.name;
    this._cardImg.src = this._obj.link;
    this._cardImg.alt = this._obj.name;
    this._setListeners();
    this.checkMyOwnLikes(this._obj);
    return this._item;
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._item.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleting(this);
    });
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _handleLike() {
    if (this._likeButton.classList.contains('card__button_active')) {
      this._deleteLikeWithApi(this._obj)
    } else {
      this._putLikeWithApi(this._obj);
    }
  }

  sendLike() {
    this._likeButton.classList.add('card__button_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('card__button_active');
  }

  handeDeleting() {
    this._item.remove();
    this._item = null;
  }

  checkMyOwnLikes(obj) {
    this._likesCount.textContent = obj.likes.length;
    this._result = this._checkLikesArray();
    if (this._result) {
      this.sendLike();
    } else {
      this.deleteLike();
    }
  }

  _checkLikesArray() {
    return this._obj.likes.some(id => id._id === this._id)
  }

}
