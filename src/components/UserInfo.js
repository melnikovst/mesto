export class UserInfo {
    constructor({ profileName , profileDescription, profileAvatar }, profileData) {
        this._profileName = profileName;
        this._description = profileDescription;
        this._profileAvatar = profileAvatar;
        this._obj = {};
        this._profileData = profileData.then(profile => this._profileData = profile);
    }

    getUserInfo() {
        this._object = {
            author: this._profileName.textContent,
            description: this._description.textContent,
            avatar: this._profileAvatar.src
        };
        return this._object;
    }

    getUserId() {
        return this._profileData;
    }

    setUserInfo() {
        this._profileName.textContent = this._profileData.name;
        this._description.textContent = this._profileData.about;
        this._profileAvatar.src = this._profileData.avatar
    }

    setUserAvatar(obj) {
        this._profileAvatar.src = obj.avatar;
    }
}