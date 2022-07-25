import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._form = document.querySelector('#submit-form');
        this._formBtn = this._form.querySelector('.form__button');
        this._avatarImage = document.querySelector('.profile__image');
        this._submitHandler = submitHandler;
    }

    getCardObject(obj) {
        this._obj = obj;
    }

    _handle(evt) {
        evt.preventDefault();
        console.log(this._formBtn);
    }

    setListeners() {
        console.log(this._form);
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._obj);
            this.close();
        });
    }
}
