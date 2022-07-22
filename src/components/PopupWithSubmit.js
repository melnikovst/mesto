import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._item.querySelector('.form');
        this._input = this._form.querySelector('.form__input');
        this._formBtn = this._form.querySelector('.form__button');
        this._avatarImage = document.querySelector('.profile__image');
    }
    getValue() {
        return {
            avatar: this._input.value
        }
    }
    setListeners() {
        super.setEventListeners();
        this._avatarImage.addEventListener('click', () => {
            this.open();
        });
    }
}
