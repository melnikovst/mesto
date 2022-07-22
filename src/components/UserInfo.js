export class UserInfo {
    constructor({ profileName , profileDescription, profileAvatar }, id) {
        this._profileName = profileName;
        this._description = profileDescription;
        this._profileAvatar = profileAvatar;
        this._obj = {};
        this._id = id.then(profile => this._id = profile);
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
        return this._id;
    }

    saveId() {
        return 
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.name;
        this._description.textContent = obj.about;
        this._profileAvatar.src = obj.avatar
    }

    setUserAvatar(obj) {
        this._profileAvatar.src = obj.avatar;
    }
}