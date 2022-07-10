export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._submitButtonSelector = settings.submitButtonSelector;
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputs(input);
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            this._error = this._form.querySelector(`.${input.id}-error`);
            this._hideError(input);
        });
    }

    _toggleButtonState() {
        if (this._checkInvalidInputs() === true) {
            this.disableButton();
        } else {
            this._enableButton();
        }
    }

    _enableButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    }

    disableButton() { 
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    }

    _checkInvalidInputs() {
        return this._inputList.some((input) => !input.validity.valid);
    }

    _showError(input) {
        input.classList.add(this._inputErrorClass);
        this._error.textContent = input.validationMessage;
        this._error.classList.add(this._errorClass);
    }

    _hideError(input) {
        if (this._error === false) {
            return;
        }
        input.classList.remove(this._inputErrorClass);
        this._error.textContent = '';
        this._error.classList.remove(this._errorClass);
    }

    _checkInputs(input) {
        this._error = this._form.querySelector(`.${input.id}-error`);
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }
}

