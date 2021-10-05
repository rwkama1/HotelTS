"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
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
    //***************** GET PASSANGER ***************** */
    getPassanger = async (idcard) => {
        const gpassanger = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (gpassanger === null) {
            throw new logicexception_1.LogicException("The Passenger does not exists in the system");
        }
        return gpassanger.getDTO();
    };
    getPassangers = async () => {
        const gpassangers = await LGetPassenger_1.LGetPassenger.getLPassengerss();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayPassenger(gpassangers.arraypassenger);
        return arraydto;
    };
    getLActiveSortPassengers = async () => {
        let gpassangers = await LGetPassenger_1.LGetPassenger.getLActiveSortPassengers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayPassenger(gpassangers);
        return arraydto;
    };
    getLPassengerbyname = async (name, surname) => {
        let gpassangers = await LGetPassenger_1.LGetPassenger.getLPassengerbyname(name, surname);
        if (gpassangers === null) {
            throw new logicexception_1.LogicException("The Passenger does not exists in the system");
        }
        return gpassangers.getDTO();
    };
    //******************* AUTENTICATION *********************** */
    loginPassenger = async (idcard, password) => {
        const lp = await LPassengerAutentication_1.LPassengerAutentication.getInstance().loginPassenger(idcard, password);
        return lp.getDTO();
    };
    getloginPassenger = () => {
        const getlp = LPassengerAutentication_1.LPassengerAutentication.getInstance().passengerlogin;
        if (getlp === null) {
            throw new logicexception_1.LogicException("There is no passenger logged in");
        }
        return getlp.getDTO();
    };
    logout = () => {
        const logout = LPassengerAutentication_1.LPassengerAutentication.getInstance().logout();
        return logout;
    };
}
exports.PassengerController = PassengerController;
//# sourceMappingURL=PassengerController.js.map