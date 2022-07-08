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

    setUserInfo() {
        this._obj = this.getUserInfo();
        this._author.textContent = this._obj.name;
        this._description.textContent = this._obj.description;
    }
}