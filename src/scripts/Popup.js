export class Popup {
    constructor(popup) {
        this._item = popup;
    }
    open() {
        this._item.classList.add('popup_opened');
        document.addEventListener('keyup', (e) => {
            this._handleEscClose(e);
        });
    }

    close() {
        this._item.classList.remove('popup_opened');
        document.removeEventListener('keyup', (e) => {
            this._handleEscClose(e);
        });
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
          }
    }
    
    setEventListeners() {
        this._closeBtn = this._item.querySelector('.popup__button-escape');
        this._item.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__button-escape')) {
                this.close();
              }
        })
    }
}