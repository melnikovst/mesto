import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup)
        this._submitHandler = submitHandler;
        this._form = this._item.querySelector('.form');
        this._inputsList = this._form.querySelectorAll('.form__input');
        this._formBtn = this._form.querySelector('.form__button');
        this._handleState = this._handleState.bind(this);
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
        e.preventDefault();
        this._formBtn.disabled = true;
        this._obj = this._getInputValues();
        this._formBtn.textContent = 'Сохранение...';
        console.log(this._obj);
        this._submitHandler(this._obj).then(() => {
            this.close();
        }).finally(() => {
            setTimeout(() => {
                this._formBtn.disabled = false;
                this._formBtn.textContent = 'Сохранить';
            }, 500)
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
        //SetTimeout добавил, т.к. форма очищается быстрее, чем заканчивается анимация, некрасиво :)
        setTimeout(() => this._form.reset(), 500) 
    }
}