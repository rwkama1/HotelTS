"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOPassenger {
    idcard;
    name;
    surname;
    country;
    town;
    address;
    phone;
    maill;
    salt;
    password;
    statee;
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
exports.default = DTOPassenger;
//# sourceMappingURL=DTOPassenger.js.map