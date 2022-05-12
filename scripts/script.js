const popupOpened = document.querySelector('.profile__title-button');
const popup = document.querySelector('.popup');
const popupClosed = document.querySelector('.popup__button-escape');


function open () {
    popup.classList.add('popup__opened');
};

function close () {
    popup.classList.remove('popup__opened');
};

popupClosed.addEventListener('click', close);
popupOpened.addEventListener('click', open);