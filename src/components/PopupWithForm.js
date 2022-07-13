import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup)
        this._submitHandler = submitHandler;
        this._form = this._item.querySelector('.form');
        this._inputsList = this._form.querySelectorAll('.form__input');
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
        //SetTimeout добавил, т.к. форма очищается быстрее, чем заканчивается анимация, некрасиво :)
        setTimeout(() => this._form.reset(), 500) 
    }
}