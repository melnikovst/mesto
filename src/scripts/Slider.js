export class Slider {
    constructor(item, buttons, container, throttle) {
        this._card = item;
        this._buttons = buttons;
        this._container = container;
        this._cardIndex = 0;
        this._throttle = throttle;
        this.changeSlideThrottling = this._throttle(this._changeSlide.bind(this), 150)
    }

    _changeSlide(direction) {
        this._cardList = document.querySelectorAll('.card')
        this._slidesCount = this._cardList.length;
        if (this._slidesCount <= 3) {
            return;
        }
        this._dynamicCardElementWidth = this._container.querySelector('.card').clientWidth + 20;
        if (direction === 'next') {
            this._cardIndex++
            if (this._cardIndex === this._slidesCount - 2) {
                this._cardIndex = 0;
            }
            if (this._cardIndex >= this._slidesCount - 1 && this._slidesCount < 16) {
                this._cardIndex = this._slidesCount - 3;
            }
        }
        else if (direction === 'prev') {
            this._container.style.transform = `translateX(${this._cardIndex * this._dynamicCardElementWidth}px)`;
            this._cardIndex--
            if (this._cardIndex < 0) {
                this._cardIndex = this._slidesCount - 3;
            }
        }
        this._container.style.transform = `translateX(-${this._cardIndex * this._dynamicCardElementWidth}px)`;
    }

    setButtonsEventListeners() {
        this._buttons.prev.addEventListener('click', () => {
            this.changeSlideThrottling('prev');
        })
        this._buttons.next.addEventListener('click', () => {
            this.changeSlideThrottling('next');
        })
    }
}
