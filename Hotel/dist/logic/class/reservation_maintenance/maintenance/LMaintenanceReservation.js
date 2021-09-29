"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LCUDRoom_1 = require("../../room_maintenance/maintenance/LCUDRoom");
const LGetReservation_1 = require("./LGetReservation");
class LMaintenanceRservation {
    static cancelReservation = async (numberreservation) => {
        let getreservation = await LGetReservation_1.default.getLReservation(numberreservation);
        if (getreservation === null) {
            throw new logicexception_1.LogicException("The Reservation does not exists in the system");
        }
        let datar = await getreservation.cancel();
        let canceledr = await FactoryData_1.FactoryData.getDataReservation().changeStateReservation(datar);
        return canceledr;
    };
    static removeReservationRoom = async (numberreservation, numberrom) => {
        let getreservation = await LGetReservation_1.default.getLReservation(numberreservation);
        if (getreservation === null) {
            throw new logicexception_1.LogicException("The Reservation does not exists in the system");
        }
        let datar = await getreservation.removeReservationDetail(numberrom);
        let remover = await FactoryData_1.FactoryData.getDataReservation().removeDetailReservation(datar.numberreservation, numberrom);
        return remover;
    };
    static confirmReservation = async (numberreservation) => {
        let getreservation = await LGetReservation_1.default.getLReservation(numberreservation);
        if (getreservation === null) {
            throw new logicexception_1.LogicException("The Reservation does not exists in the system");
        }
        let datar = await getreservation.confirm();
        for (let detailr of datar.listDetailReservation) {
            let disableroom = await LCUDRoom_1.LCUDRoom.changeStateRoom(detailr.numberroom, 'Inactive');
        }
        let confirmr = await FactoryData_1.FactoryData.getDataReservation().changeStateReservation(datar);
        return confirmr;
    };
    static addReservationDetail = async (dtoreservation) => {
        let getreservation = await LGetReservation_1.default.getLReservation(dtoreservation.numberreservation);
        if (getreservation === null) {
            throw new logicexception_1.LogicException("The Reservation does not exists in the system");
        }
        let datareservation = await getreservation.addDetailReservation(dtoreservation);
        for (let detailr of dtoreservation.listDetailReservation) {
            let disableroom = await LCUDRoom_1.LCUDRoom.changeStateRoom(detailr.numberroom, 'Inactive');
        }
        let addrd = await FactoryData_1.FactoryData.getDataReservation().addDetailReservation(datareservation);
        return addrd;
    };
}
exports.default = LMaintenanceRservation;
;
//# sourceMappingURL=LMaintenanceReservation.js.map