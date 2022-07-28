import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup)
        this._submitHandler = submitHandler;
        this._form = this._item.querySelector('.form');
        this._inputsList = this._form.querySelectorAll('.form__input');
        this._formBtn = this._form.querySelector('.form__button');
        this._handleState = this._handleState.bind(this);
        this._avatarImg = document.querySelector('.profile__image');
        this._spinner = document.querySelector('.spinner');
    }

    _getInputValues() {
        this._inputData = {};
        this._inputsList.forEach(input => {
            return this._inputData[input.id] = input.value;
        });
        return this._inputData;
    }

    setInputValues(obj) {
        this._inputsList.forEach(input => {
            input.value = obj[input.id];
        })
    }

    _handleState(e) {
        console.log(this._avatarImg);
        e.preventDefault();
        this._formBtn.disabled = true;
        this._formBtn.textContent = 'Сохранение...';
        this._obj = this._getInputValues();
        if (this._obj.hasOwnProperty('avatar')) {
            this._avatarImg.classList.add('profile__image_while_loading');
            this._spinner.classList.add('spinner_visible');
        }
        this._submitHandler(this._obj).then(() => {
            this.close();
        }).catch(() => {
            this._formBtn.textContent = 'Ошибка сервера :('
        }).finally(() => {
            if (this._obj.hasOwnProperty('avatar')) {
                this._spinner.classList.remove('spinner_visible');
                this._avatarImg.classList.remove('profile__image_while_loading');
            }
            setTimeout(() => {
                this._formBtn.disabled = false;
                this._formBtn.textContent = 'Сохранить';
            }, 2000)
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._item.addEventListener('submit', (e) => {
            this._handleState(e);
        })
    }

    close() {
        super.close();
        setTimeout(() => this._form.reset(), 500)
    }
}