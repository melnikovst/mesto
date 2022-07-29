import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._item.querySelector('.popup__image-item');
        this._title = this._item.querySelector('.popup__image-subtitle');
    }

    open(name, link) {
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
        super.open();
    }
}