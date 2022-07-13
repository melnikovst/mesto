export class Popup {
    constructor(popup) {
        this._item = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._item.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._item.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
          }
    }
    
    setEventListeners() {
        this._item.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__button-escape')) {
                this.close();
              }
        })
    }
}