"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerController = void 0;
const instanceBusinessClass_1 = require("../extras/instanceBusinessClass");
const LGetPassenger_1 = require("./maintenace/LGetPassenger");
const LPassengerAutentication_1 = require("./maintenace/LPassengerAutentication");
class PassengerController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!PassengerController.instancia) {
            PassengerController.instancia = new PassengerController();
        }
        return PassengerController.instancia;
    }
    //************ CRUD ********************** */
    registerPassenger = async (dtpassenger) => {
        const logicp = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpassenger);
        const result = await logicp.register();
        return result;
    };
    updatePassanger = async (dtpassenger) => {
        const logicp = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpassenger);
        const result = await logicp.update();
        return result;
    };
    inactivatePassanger = async (dtpassenger) => {
        const logip = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpassenger);
        const result = await logip.disable();
        return result;
    };
    getPassanger = async (idcard) => {
        const gpassanger = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        return gpassanger;
    };
    //***************** GET PASSANGER ***************** */
    getPassangers = async () => {
        const gpassangers = await LGetPassenger_1.LGetPassenger.getLPassengerss();
        return gpassangers;
    };
    getLActiveSortPassengers = async () => {
        let gpassangers = await LGetPassenger_1.LGetPassenger.getLActiveSortPassengers();
        return gpassangers;
    };
    //******************* AUTENTICATION *********************** */
    loginPassenger = async (idcard, password) => {
        const lp = await LPassengerAutentication_1.LPassengerAutentication.getInstance().loginPassenger(idcard, password);
        return lp;
    };
    getloginPassenger = () => {
        const getlp = LPassengerAutentication_1.LPassengerAutentication.getInstance().passengerlogin;
        return getlp;
    };
    logout = () => {
        const logout = LPassengerAutentication_1.LPassengerAutentication.getInstance().logout();
        return logout;
    };
}
exports.PassengerController = PassengerController;
//# sourceMappingURL=PassengerController.js.map