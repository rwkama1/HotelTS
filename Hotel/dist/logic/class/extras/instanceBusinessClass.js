"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceLogicClass = void 0;
const LDetailReservation_1 = require("../business_class/LDetailReservation");
const LPassenger_1 = require("../business_class/LPassenger");
const LReservation_1 = require("../business_class/LReservation");
const LRoom_1 = require("../business_class/LRoom");
const LService_1 = require("../business_class/LService");
const LUser_1 = require("../business_class/LUser");
const LGetPassenger_1 = require("../passenger_maintenance/maintenace/LGetPassenger");
const LGetRoom_1 = require("../room_maintenance/maintenance/LGetRoom");
class InstanceLogicClass {
    static instanceLUser = (dtouser) => {
        var logicuser = new LUser_1.default(dtouser.idcard, dtouser.name, dtouser.surname, dtouser.address, dtouser.phone, dtouser.typeuserr, dtouser.password, dtouser.hashh, dtouser.maill, dtouser.statee);
        return logicuser;
    };
    static instanceLPassenger = (dtopassenger) => {
        var logicpassenger = new LPassenger_1.default(dtopassenger.idcard, dtopassenger.name, dtopassenger.surname, dtopassenger.country, dtopassenger.town, dtopassenger.address, dtopassenger.phone, dtopassenger.maill, dtopassenger.salt, dtopassenger.password, dtopassenger.statee);
        return logicpassenger;
    };
    static instanceLRoom = (dtoroom) => {
        var logicroom = new LRoom_1.default(dtoroom.numberroom, dtoroom.typeroom, dtoroom.typebed, dtoroom.acommodation, dtoroom.description, dtoroom.value, dtoroom.statee, dtoroom.image);
        return logicroom;
    };
    static instanceLService = (dtoservice) => {
        var logicservice = new LService_1.default(dtoservice.idservice, dtoservice.name, dtoservice.value, dtoservice.statee);
        return logicservice;
    };
    static instanceLReservation = async (dtoreservation) => {
        let arraylogicdetailreservation = [];
        let searchpassenger = await LGetPassenger_1.LGetPassenger.getLPassenger(dtoreservation.idcardpassenger);
        for (let dtodetailreservation of dtoreservation.listDetailReservation) {
            let searchroom = await LGetRoom_1.LGetRoom.getLRoom(dtodetailreservation.numberroom);
            let logicdetailr = new LDetailReservation_1.default(dtodetailreservation.numberrd, dtodetailreservation.value, searchroom);
            arraylogicdetailreservation.push(logicdetailr);
        }
        var logicreservation = new LReservation_1.default(dtoreservation.numberreservation, dtoreservation.reservationdate, dtoreservation.arrivaldate, dtoreservation.departuredate, dtoreservation.processtatus, dtoreservation.confirmationstatus, dtoreservation.origin, dtoreservation.total, searchpassenger, arraylogicdetailreservation);
        return logicreservation;
    };
}
exports.InstanceLogicClass = InstanceLogicClass;
//# sourceMappingURL=instanceBusinessClass.js.map