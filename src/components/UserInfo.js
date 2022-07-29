export class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
        this._profileName = profileName;
        this._description = profileDescription;
        this._profileAvatar = profileAvatar;
    }

    getUserInfo() {
        this._object = {
            name: this._profileName.textContent,
            about: this._description.textContent,
            avatar: this._profileAvatar.src,
        };
        return this._object;
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.name;
        this._description.textContent = obj.about;
        this._profileAvatar.src = obj.avatar
    }
}