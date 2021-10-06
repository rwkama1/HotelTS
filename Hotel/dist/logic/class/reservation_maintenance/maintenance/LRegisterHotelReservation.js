"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LReservation_1 = require("../../business_class/LReservation");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LCUDRoom_1 = require("../../room_maintenance/maintenance/LCUDRoom");
const LGetReservation_1 = require("./LGetReservation");
class LRegisterHotelReservation {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LRegisterHotelReservation.instancia) {
            LRegisterHotelReservation.instancia = new LRegisterHotelReservation();
        }
        return LRegisterHotelReservation.instancia;
    }
    _objreservation;
    get objreservation() {
        return this._objreservation;
    }
    set objreservation(value) {
        this._objreservation = value;
    }
    enterPassenger = async (idcard) => {
        let newlogicr = new LReservation_1.default(0, new Date(), new Date(), new Date(), "Pending", "NotConfirmed", "Hotel", 0, null, []);
        this.objreservation = newlogicr;
        let enterp = this.objreservation.enterPassenger(idcard);
        return enterp;
    };
    registerPassenger = async (dtopassenger) => {
        let lreservation = this.objreservation;
        if (lreservation.passenger === null) {
            const logicp = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtopassenger);
            const result = await logicp.register();
            if (result === true) {
                let enterp = lreservation.enterPassenger(logicp.idcard);
                return enterp;
            }
        }
        else {
            throw new logicexception_1.LogicException("The Passenger already exists");
        }
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
        lreservation.processtatus = "Confirmed";
        lreservation.confirmationstatus = "Confirmed";
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
            for (let detailr of dtoreservation.listDetailReservation) {
                let disableroom = await LCUDRoom_1.LCUDRoom.changeStateRoom(detailr.numberroom, 'Inactive');
            }
            return result;
        }
        else {
            throw new logicexception_1.LogicException("The Reservation is null");
        }
    };
}
exports.default = LRegisterHotelReservation;
//# sourceMappingURL=LRegisterHotelReservation.js.map