
export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    loadCards() {
        this._cards = fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        return this._cards;
    }

    loadProfile() {
        this._profileInfo = fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        return this._profileInfo;
    }

    changeProfile(obj) {
        this._changedProfile = fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: obj.author,
                about: obj.description
            })
        });
        return this._changedProfile;
    }

    addCard(obj) {
        this._addedCard = fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        })
        return this._addedCard;
    }

    deleteCard(obj) {
        this._deletedCard = fetch(`${this._url}/cards/${obj._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        return this._deletedCard;
    }
}

