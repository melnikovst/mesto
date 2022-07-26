export class Card {
  constructor(obj, cardSelector, handleCardClick, handleTrashImg, { userId }, putLike, deleteLike) {
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
    if (this._id !== this._cardOwner) {
      this._deletingBtn.style.display = 'none';
    }
    this._likesCount = this._item.querySelector('.card__like_amount');
    this._cardImg = this._item.querySelector('.card__image');
    this._cardTitle = this._item.querySelector('.card__title');
    this._cardTitle.textContent = this._obj.name;
    this._cardImg.src = this._obj.link;
    this._cardImg.alt = this._obj.name;
    this._setListeners();
    this._checkMyOwnLikes();
    return this._item;
  }

  _setListeners() {

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
      console.log(this._obj.owner._id); //console.log(), чтобы воровать токен одногруппников
    });
    this._item.querySelector('.card__delete-button').addEventListener('click', () => {
      console.log(this);
      this._deleting(this);
    });
    this._item.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);

    })
  }

  _handleLike() {
    if (this._checkLikesArray()) {
      this._deleteLikeWithApi(this._obj).then(res => {
        this._obj = res;
        this._checkMyOwnLikes()
      })
    } if (!this._checkLikesArray()) {
      this._putLikeWithApi(this._obj).then(res => {
        this._obj = res;
        this._checkMyOwnLikes()
      })
    }
  }

  _sendLike() {
    this._likeButton.classList.add('card__button_active');
  }

  _deleteLike() {
    this._likeButton.classList.remove('card__button_active');
  }

  handeDeleting() {
    this._item.remove();
    this._item = null;
  }

  _checkMyOwnLikes() {
    this._likesCount.textContent = this._obj.likes.length;
    this._result = this._checkLikesArray();
    if (this._result) {
      this._sendLike();
    } else {
      this._deleteLike();
    }
  }

  _checkLikesArray() {
    return this._obj.likes.some(id => id._id === this._id)
  }

}
