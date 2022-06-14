const checkInvalidInputs = (inputList) => inputList.some((input) =>  !input.validity.valid);

const disableButton = (button, settings) => {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
};

const enableButton = (button, settings) => {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
};

const toggleButtonState = (button, inputList, settings) => {
    if(checkInvalidInputs(inputList) === true) {
        disableButton(button, settings);
    } else {
        enableButton(button, settings);
    }
};

const showError = (form, input, settings) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(settings.errorClass);
};

const hideError = (form, input, settings) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    error.textContent = '';
    error.classList.remove(settings.errorClass);
};

const checkInputs = (form, input, settings) => {
    if (!input.validity.valid) {
        showError(form, input, settings);
    } else {
        hideError(form, input, settings);
    }
};

const setEventListeners = (form, settings) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(button, inputList, settings);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputs(form, input, settings);
            toggleButtonState(button, inputList, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, settings);
    });
};

const removeErrorsOpenedPopups = (form) => {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    inputs.forEach(input => {
        hideError(form, input, settings);
    });
};

enableValidation(settings);
