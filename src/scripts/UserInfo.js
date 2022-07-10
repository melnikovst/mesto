export class UserInfo {
    constructor({ profileName , profileDescription }) {
        this._author = profileName;
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