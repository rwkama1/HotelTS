"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPassengerAutentication = void 0;
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LGetPassenger_1 = require("./LGetPassenger");
class LPassengerAutentication {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LPassengerAutentication.instancia) {
            LPassengerAutentication.instancia = new LPassengerAutentication();
        }
        return LPassengerAutentication.instancia;
    }
    _passengerlogin;
    get passengerlogin() {
        return this._passengerlogin;
    }
    set passengerlogin(value) {
        this._passengerlogin = value;
    }
    loginPassenger = async (idcard, password) => {
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (passengersearch === null) {
            throw new logicexception_1.LogicException("That Passenger does not exists in the system");
        }
        if (passengersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Passenger is inactive");
        }
        await passengersearch.login(password);
        this.passengerlogin = passengersearch;
        return passengersearch;
    };
    logout() {
        let lguser = this.passengerlogin;
        if (lguser != null) {
            this.passengerlogin = null;
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LPassengerAutentication = LPassengerAutentication;
//# sourceMappingURL=LPassengerAutentication.js.map