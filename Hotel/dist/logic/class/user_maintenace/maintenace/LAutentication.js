"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LUserAutentication = void 0;
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LGetUsers_1 = require("./LGetUsers");
class LUserAutentication {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LUserAutentication.instancia) {
            LUserAutentication.instancia = new LUserAutentication();
        }
        return LUserAutentication.instancia;
    }
    _userlogin;
    get userlogin() {
        return this._userlogin;
    }
    set userlogin(value) {
        this._userlogin = value;
    }
    loginUser = async (idcard, password) => {
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User does not exists in the system");
        }
        if (usersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That User is inactive");
        }
        await usersearch.login(password);
        this.userlogin = usersearch;
        return usersearch;
    };
    logout() {
        let lguser = this.userlogin;
        if (lguser != null) {
            this.userlogin = null;
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LUserAutentication = LUserAutentication;
//# sourceMappingURL=LAutentication.js.map