"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOUser_1 = require("../../../shared/entity/DTOUser");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../encrypt/hashPassword");
const LCUDUsers_1 = require("../user_maintenace/maintenace/LCUDUsers");
const LGetUsers_1 = require("../user_maintenace/maintenace/LGetUsers");
class LogicUser {
    _idcard;
    _name;
    _surname;
    _address;
    _hashh;
    _maill;
    _phone;
    _password;
    _statee;
    _typeuserr;
    //GETTERS
    get idcard() {
        return this._idcard;
    }
    get name() {
        return this._name;
    }
    get surname() {
        return this._surname;
    }
    get address() {
        return this._address;
    }
    get hashh() {
        return this._hashh;
    }
    get maill() {
        return this._maill;
    }
    get password() {
        return this._password;
    }
    get phone() {
        return this._phone;
    }
    get statee() {
        return this._statee;
    }
    get typeuserr() {
        return this._typeuserr;
    }
    //SETTERS
    set idcard(value) {
        var numbers = /^[0-9]+$/;
        if (!value.trim().match(numbers)) {
            throw new logicexception_1.LogicException("The identity card must have only numbers");
        }
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The identity card cannot be empty");
        }
        this._idcard = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set surname(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The surname cannot be empty");
        }
        this._surname = value;
    }
    set address(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The address cannot be empty");
        }
        this._address = value;
    }
    set hashh(value) {
        this._hashh = value;
    }
    set maill(value) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat)) {
            throw new logicexception_1.LogicException("The email is not valid");
        }
        this._maill = value;
    }
    set phone(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The phone cannot be empty");
        }
        this._phone = value;
    }
    set password(value) {
        this._password = value;
    }
    set statee(value) {
        this._statee = value;
    }
    set typeuserr(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The typeuser cannot be empty");
        }
        if (value.trim() != "Administrator" && value.trim() != "Receptionist") {
            throw new logicexception_1.LogicException("The user can only be of the type Administrator or Receptionist");
        }
        this._typeuserr = value;
    }
    //******************************************************* */
    validatePassword = () => {
        let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
        if (!this.password.match(pass)) {
            throw new logicexception_1.LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
        }
    };
    //******************************************************* */
    register = async () => {
        this.validatePassword();
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(this.idcard);
        if (usersearch != null) {
            if (usersearch.statee === "Active") {
                throw new logicexception_1.LogicException("That User already exists in the system");
            }
            else {
                const actuser = await LCUDUsers_1.LCRUDUser.changestateUser(usersearch.idcard, "Active");
                return actuser;
            }
        }
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.hashh = passh.salt;
        const dto = this.getDTO();
        const reguser = await LCUDUsers_1.LCRUDUser.registerUser(dto);
        return reguser;
    };
    update = async () => {
        this.validatePassword();
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(this.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User do not exists in the system");
        }
        if (usersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That User is inactive");
        }
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.hashh = passh.salt;
        const dto = this.getDTO();
        const updateuser = await LCUDUsers_1.LCRUDUser.updateUser(dto);
        return updateuser;
    };
    disable = async () => {
        this.validatePassword();
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(this.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User do not exists in the system");
        }
        if (usersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That User is inactive");
        }
        const dto = this.getDTO();
        const deluser = await LCUDUsers_1.LCRUDUser.changestateUser(dto.idcard, "Inactive");
        return deluser;
    };
    login = async (pass) => {
        const verifyp = await hashPassword_1.default.verifyPassword(pass, this.password, this.hashh);
        if (verifyp === false) {
            throw new logicexception_1.LogicException("Wrong password");
        }
    };
    getDTO = () => {
        let dtouser = new DTOUser_1.default(this.idcard, this.name, this.surname, this.address, this.phone, this.typeuserr, this.password, this.hashh, this.maill, this.statee);
        return dtouser;
    };
    constructor(pidcard, pname, psurname, paddress, pphone, ptypeuser, ppasswordd, phash, pmail, pstate) {
        this.idcard = pidcard;
        this.name = pname;
        this.surname = psurname;
        this.address = paddress;
        this.phone = pphone;
        this.typeuserr = ptypeuser;
        this.password = ppasswordd;
        this.hashh = phash;
        this.maill = pmail;
        this.statee = pstate;
    }
}
exports.default = LogicUser;
//# sourceMappingURL=LUser.js.map