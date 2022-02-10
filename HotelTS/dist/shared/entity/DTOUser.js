"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOUser {
    idcard;
    name;
    surname;
    address;
    hashh;
    maill;
    phone;
    password;
    statee;
    typeuserr;
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
exports.default = DTOUser;
//# sourceMappingURL=DTOUser.js.map