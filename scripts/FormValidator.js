import { settings } from "./variables.js";

export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._submitButtonSelector = settings.submitButtonSelector;
    }

    enableValidation() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(button, inputList);
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputs(form, input);
                this._toggleButtonState(button, inputList);
            });
        });
    }

    _toggleButtonState(button, inputList) {
        if (this._checkInvalidInputs(inputList) === true) {
            this._disableButton(button);
        } else {
            this._enableButton(button);
        }
    }

    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
    }

    _disableButton(button) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }

    _checkInvalidInputs(inputList) {
        return inputList.some((input) => !input.validity.valid);
    }

    _showError(form, error, input) {
        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(settings.errorClass);
    }

    _hideError(form, error, input) {
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
        error.classList.remove(settings.errorClass);
    }

    _checkInputs(form, input) {
            const error = this._form.querySelector(`.${input.id}-error`);
            if (!input.validity.valid) {
                this._showError(form, error, input);
            } else {
                this._hideError(form, error, input);
            }
    }
}

