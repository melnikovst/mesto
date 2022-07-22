export class UserInfo {
    constructor({ profileName , profileDescription, profileAvatar }) {
        this._profileName = profileName;
        this._description = profileDescription;
        this._profileAvatar = profileAvatar;
    }

    getUserInfo() {
        this._object = {
            author: this._profileName.textContent,
            description: this._description.textContent,
            avatar: this._profileAvatar.src
        };
        return this._object;
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.name;
        this._description.textContent = obj.about;
    }

    setUserAvatar(obj) {
        this._profileAvatar.src = obj.avatar;
    }
}