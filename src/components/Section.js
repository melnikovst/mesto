export class Section {
    constructor({ renderer }, container) {
        this._container = container;
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