export class UserInfo {
    constructor({ profileName , profileDescription, profileAvatar }, profileData) {
        this._profileName = profileName;
        this._description = profileDescription;
        this._profileAvatar = profileAvatar;
        this._profileData = profileData;
    }

    getUserInfo() {
        this._object = {
            name: this._profileName.textContent,
            about: this._description.textContent,
            avatar: this._profileAvatar.src
        };
        return this._object;
    }

    getUserId() {
        return this._profileData._id;
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.name;
        this._description.textContent = obj.about;
        this._profileAvatar.src = obj.avatar
    }

    sendProfile() {
        return this._profileData;
    }

    setUserAvatar(obj) {
        this._profileAvatar.src = obj.avatar;
    }
}