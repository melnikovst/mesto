export class Section {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }
    
    renderItems(cards) {
        cards.reverse().forEach(item => {
            this._renderer(item);
        })
    }

    addItem(item) {
        this._container.prepend(item);
    }
}