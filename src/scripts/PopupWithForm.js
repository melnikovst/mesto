import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup)
        this._submitHandler = submitHandler;
        this._form = this._item.querySelector('.form');
    }
    _getInputValues() {
        this._inputsList = this._form.querySelectorAll('.form__input');
        this._inputData = {};
        this._inputsList.forEach(input => {
            return this._inputData[input.id] = input.value;
        });
        return this._inputData;
    }
    setEventListeners() {
        super.setEventListeners();
        this._item.addEventListener('submit', (e) => {
            this._obj = this._getInputValues();
            e.preventDefault();
            this._submitHandler(this._obj);
            this.close();
        })
    }
    close() {
        super.close();
        setTimeout(() => this._form.reset(), 1000)
    }
}