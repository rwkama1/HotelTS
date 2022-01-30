"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayReservation_1 = require("../../business_class/array/LArrayReservation");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetReservation {
    static getLReservations = async () => {
        let arrayr = [];
        let datar = await FactoryData_1.FactoryData.getDataReservation().getReservations();
        for (var reservation of datar) {
            const logicr = await instanceBusinessClass_1.InstanceLogicClass.instanceLReservation(reservation);
            arrayr.push(logicr);
        }
        let arraylogicreservation = new LArrayReservation_1.ArrayReservation(arrayr);
        return arraylogicreservation;
    };
    static getLReservation = async (numberr) => {
        let datar = await this.getLReservations();
        let searchr = datar.search(numberr);
        return searchr;
    };
    static getLReservationPassenger = async (idcard) => {
        let datar = await this.getLReservations();
        let searchr = datar.searchbyPassenger(idcard);
        return searchr;
    };
    static getReservationbydates = async (date1, date2) => {
        let datar = await this.getLReservations();
        let searchr = datar.getbyDates(date1, date2);
        return searchr;
    };
    static getLPending = async () => {
        let datar = await this.getLReservations();
        let getp = datar.getPending();
        return getp;
    };
    static getLPendingPassenger = async (idcard) => {
        let datar = await this.getLReservations();
        let getp = datar.getPendingbyPassenger(idcard);
        return getp;
    };
    static getLConfirmed = async () => {
        let datar = await this.getLReservations();
        let getp = datar.getConfirmed();
        return getp;
    };
    static getLCanceled = async () => {
        let datar = await this.getLReservations();
        let getp = datar.getCanceled();
        return getp;
    };
    static getLByRoom = async (numberr) => {
        let datar = await this.getLReservations();
        let getp = datar.getByRoom(numberr);
        return getp;
    };
}
exports.default = LGetReservation;
//# sourceMappingURL=LGetReservation.js.map