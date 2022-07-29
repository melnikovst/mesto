import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._form = document.querySelector('#submit-form');
        this._formBtn = this._form.querySelector('.form__button');
        this._avatarImage = document.querySelector('.profile__image');
        this._submitHandler = submitHandler;
    }

    setCardObject(obj) {
        this._obj = obj;
    }

    setListeners() {
        super.setEventListeners();
        this._formBtn.classList.remove('form__button_disabled');
        this._formBtn.disabled = false;
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._obj);
            this.close();
        });
    }
}
