let popupOpened = document.querySelector('.profile__title-button');
let popup = document.querySelector('.popup');
let popupClosed = document.querySelector('.popup__button-escape');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_job');
let job = document.querySelector('.profile__subtitle');
let author = document.querySelector('.profile__title');

function open () {
    popup.classList.add('popup_opened');
    nameInput.value = author.textContent;
    jobInput.value = job.textContent; 
};

function close () {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    author.textContent = nameInput.value;
    job.textContent = jobInput.value;
    close();
}

popupOpened.addEventListener('click', open);
popupClosed.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler); 

