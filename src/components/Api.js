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

    getProfileId() {
        return this.test = fetch(`${this._url}/users/me`, {
            headers: this._headers
        }).then(res => res.json());
    }

    putLike(obj) {
        this._like = fetch(`${this._url}/cards/${obj._id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        return this._like;
    }

    deleteLike(obj) {
        return fetch(`${this._url}/cards/${obj._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
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

    setNewAvatar(obj) {
        this._newAvatar = fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: obj.avatar
            })
        })
        return this._newAvatar;
    }
    getLikesArray(obj) {
        this._likesArray = fetch(`${this._url}/cards/${obj._id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        return this._likesArray;
    }
}

