"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOPassenger_1 = require("../../../shared/entity/DTOPassenger");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../encrypt/hashPassword");
const LCUDPassenger_1 = require("../passenger_maintenance/maintenace/LCUDPassenger");
const LGetPassenger_1 = require("../passenger_maintenance/maintenace/LGetPassenger");
class LogicPassenger {
    _idcard;
    _name;
    _surname;
    _country;
    _town;
    _address;
    _phone;
    _maill;
    _statee;
    _salt;
    _password;
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
    get country() {
        return this._country;
    }
    get town() {
        return this._town;
    }
    get address() {
        return this._address;
    }
    get phone() {
        return this._phone;
    }
    get maill() {
        return this._maill;
    }
    get salt() {
        return this._salt;
    }
    get password() {
        return this._password;
    }
    get statee() {
        return this._statee;
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
    set country(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The country cannot be empty");
        }
        this._country = value;
    }
    set town(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The town cannot be empty");
        }
        this._town = value;
    }
    set address(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The address cannot be empty");
        }
        this._address = value;
    }
    set phone(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The phone cannot be empty");
        }
        this._phone = value;
    }
    set maill(value) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat)) {
            throw new logicexception_1.LogicException("The email is not valid");
        }
        this._maill = value;
    }
    set salt(value) {
        this._salt = value;
    }
    set password(value) {
        this._password = value;
    }
    set statee(value) {
        this._statee = value;
    }
    validatePassword = () => {
        let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
        if (!this.password.match(pass)) {
            throw new logicexception_1.LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
        }
    };
    register = async () => {
        this.validatePassword();
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(this.idcard);
        if (passengersearch != null) {
            if (passengersearch.statee === "Active") {
                throw new logicexception_1.LogicException("That Passenger already exists in the system");
            }
            else {
                const actpasse = await LCUDPassenger_1.LCUDPassenger.changestatePassenger(passengersearch.idcard, "Active");
                return actpasse;
            }
        }
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.salt = passh.salt;
        const dto = this.getDTO();
        const reguser = await LCUDPassenger_1.LCUDPassenger.registerPassenger(dto);
        return reguser;
    };
    update = async () => {
        this.validatePassword();
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(this.idcard);
        if (passengersearch === null) {
            throw new logicexception_1.LogicException("That Passenger do not exists in the system");
        }
        if (passengersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Passenger is inactive");
        }
        const passh = await hashPassword_1.default.hashPassword(this.password);
        this.password = passh.hash;
        this.salt = passh.salt;
        const dto = this.getDTO();
        const updateuser = await LCUDPassenger_1.LCUDPassenger.updatePassenger(dto);
        return updateuser;
    };
    disable = async () => {
        this.validatePassword();
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(this.idcard);
        if (passengersearch === null) {
            throw new logicexception_1.LogicException("That Passenger do not exists in the system");
        }
        if (passengersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Passenger is inactive");
        }
        const dto = this.getDTO();
        const deluser = await LCUDPassenger_1.LCUDPassenger.changestatePassenger(dto.idcard, "Inactive");
        return deluser;
    };
    login = async (pass) => {
        const verifyp = await hashPassword_1.default.verifyPassword(pass, this.password, this.salt);
        if (verifyp === false) {
            throw new logicexception_1.LogicException("Wrong password");
        }
    };
    getDTO = () => {
        let dtpassenger = new DTOPassenger_1.default(this.idcard, this.name, this.surname, this.country, this.town, this.address, this.phone, this.maill, this.salt, this.password, this.statee);
        return dtpassenger;
    };
    constructor(pidcard, pname, psurname, pcountry, ptown, paddress, pphone, ppmail, psalt, ppassword, pstate) {
        this.idcard = pidcard;
        this.name = pname;
        this.surname = psurname;
        this.country = pcountry;
        this.town = ptown;
        this.address = paddress;
        this.phone = pphone;
        this.maill = ppmail;
        this.salt = psalt;
        this.password = ppassword;
        this.statee = pstate;
    }
}
exports.default = LogicPassenger;
//# sourceMappingURL=LPassenger.js.map