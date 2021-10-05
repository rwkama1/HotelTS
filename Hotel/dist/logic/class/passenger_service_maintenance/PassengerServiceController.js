"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerServiceController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LAddService_1 = require("./maintenance/LAddService");
const LGetPassengerServices_1 = require("./maintenance/LGetPassengerServices");
const LRegisterPassengerService_1 = require("./maintenance/LRegisterPassengerService");
class PassengerServiceController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!PassengerServiceController.instancia) {
            PassengerServiceController.instancia = new PassengerServiceController();
        }
        return PassengerServiceController.instancia;
    }
    /****************************  REGISTER *********************************** */
    startPS = async () => {
        const startp = await LRegisterPassengerService_1.default.getInstance().startPS();
        return startp;
    };
    registerDPS = async (idservice) => {
        const regp = await LRegisterPassengerService_1.default.getInstance().registerDPS(idservice);
        return regp;
    };
    removeDPS = async (idservice) => {
        const remdps = await LRegisterPassengerService_1.default.getInstance().removeDPS(idservice);
        return remdps;
    };
    closePS = async (dtops) => {
        const close = await LRegisterPassengerService_1.default.getInstance().closePS(dtops);
        return close;
    };
    savePS = async () => {
        const save = await LRegisterPassengerService_1.default.getInstance().savePS();
        return save;
    };
    //************************** ADD  SERVICE TO PASSENGER SERVICES *********************** */
    enterPassenger = async (idcard) => {
        let getp = await LAddService_1.default.getInstance().enterPassenger(idcard);
        return getp;
    };
    addDPS = async (dtops) => {
        let addrd = await LAddService_1.default.getInstance().addDPS(dtops);
        return addrd;
    };
    //******************* GETS ********************* */
    getPSbyPassenger = async (idcard) => {
        let getps = await LGetPassengerServices_1.default.getPSbyPassenger(idcard);
        if (getps === null) {
            throw new logicexception_1.LogicException("The Passenger Service does not exists in the system");
        }
        return getps.getDTO();
    };
    getPS = async (id) => {
        let getps = await LGetPassengerServices_1.default.getPS(id);
        if (getps === null) {
            throw new logicexception_1.LogicException("The Passenger Service does not exists in the system");
        }
        return getps.getDTO();
    };
}
exports.PassengerServiceController = PassengerServiceController;
//# sourceMappingURL=PassengerServiceController.js.map