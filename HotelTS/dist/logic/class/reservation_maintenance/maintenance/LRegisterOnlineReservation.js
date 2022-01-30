"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LReservation_1 = require("../../business_class/LReservation");
const LGetPassenger_1 = require("../../passenger_maintenance/maintenace/LGetPassenger");
const LGetReservation_1 = require("./LGetReservation");
class LRegisterOnlineReservation {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LRegisterOnlineReservation.instancia) {
            LRegisterOnlineReservation.instancia = new LRegisterOnlineReservation();
        }
        return LRegisterOnlineReservation.instancia;
    }
    _objreservation;
    get objreservation() {
        return this._objreservation;
    }
    set objreservation(value) {
        this._objreservation = value;
    }
    startReservation = async () => {
        let newlogicr = new LReservation_1.default(0, new Date(), new Date(), new Date(), "Pending", "NotConfirmed", "Online", 0, null, []);
        this.objreservation = newlogicr;
        return this.objreservation;
    };
    registerReservationDetail = async (numberrom) => {
        let lreservation = this.objreservation;
        let logicreserdetail = await lreservation.registerReservationDetail(numberrom);
        return logicreserdetail;
    };
    removeReservationDetail = async (numberrom) => {
        let lreservation = this.objreservation;
        await lreservation.removeRD(numberrom);
        return true;
    };
    closeReservation = async (dtreservation) => {
        let lreservation = this.objreservation;
        let getpassenger = await LGetPassenger_1.LGetPassenger.getLPassenger(dtreservation.idcardpassenger);
        lreservation.passenger = getpassenger;
        if (lreservation != null) {
            let getreservations = await LGetReservation_1.default.getLReservations();
            let lengthreservations = getreservations.arrayreservation.length;
            lreservation.numberreservation = lengthreservations;
        }
        else {
            throw new logicexception_1.LogicException("The Reservation is null");
        }
        return lreservation.close(dtreservation);
    };
    saveReservation = async () => {
        let lreservation = this.objreservation;
        if (lreservation != null) {
            let dtoreservation = await lreservation.save();
            let result = await FactoryData_1.FactoryData.getDataReservation().registerReservation(dtoreservation);
            return result;
        }
        else {
            throw new logicexception_1.LogicException("The Reservation is null");
        }
    };
}
exports.default = LRegisterOnlineReservation;
//# sourceMappingURL=LRegisterOnlineReservation.js.map