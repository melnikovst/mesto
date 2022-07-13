export class UserInfo {
    constructor({ profileName , profileDescription }) {
        this._profileName = profileName;
        this._description = profileDescription;
    }

    getUserInfo() {
        this._object = {
            author: this._profileName.textContent,
            description: this._description.textContent,
        };
        return this._object;
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.author;
        this._description.textContent = obj.description;
    }
}