export class UserInfo {
    constructor({ authorSelector , profileDescription }) {
        this._author = authorSelector;
        this._description = profileDescription;
    }

    getUserInfo() {
        this._object = {
            name: this._author.textContent,
            description: this._description.textContent,
        };
        return this._object;
    }

    setUserInfo(obj) {
        this._author.textContent = obj.name;
        this._description.textContent = obj.description;
    }
}