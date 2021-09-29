"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const LGetReservation_1 = require("./maintenance/LGetReservation");
const LMaintenanceReservation_1 = require("./maintenance/LMaintenanceReservation");
const LRegisterHotelReservation_1 = require("./maintenance/LRegisterHotelReservation");
const LRegisterOnlineReservation_1 = require("./maintenance/LRegisterOnlineReservation");
class ReservationController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!ReservationController.instancia) {
            ReservationController.instancia = new ReservationController();
        }
        return ReservationController.instancia;
    }
    //     //**************** HOTEL RESERVATION ********************** **/
    enterPassenger = async (idcard) => {
        const enterp = await LRegisterHotelReservation_1.default.getInstance().enterPassenger(idcard);
        return enterp;
    };
    registerPassenger = async (dtopassenger) => {
        const result = await LRegisterHotelReservation_1.default.getInstance().registerPassenger(dtopassenger);
        return result;
    };
    registerReservationDetail = async (numberrom) => {
        const ldetailr = await LRegisterHotelReservation_1.default.getInstance().registerReservationDetail(numberrom);
        return ldetailr;
    };
    removeReservationDetail = async (numberrom) => {
        const result = await LRegisterHotelReservation_1.default.getInstance().removeReservationDetail(numberrom);
        return result;
    };
    closeReservation = async () => {
        const lreservation = await LRegisterHotelReservation_1.default.getInstance().closeReservation();
        return lreservation;
    };
    saveReservation = async (dtoreservation) => {
        const result = await LRegisterHotelReservation_1.default.getInstance().saveReservation(dtoreservation);
        return result;
    };
    //************************** MAINTENANCE ******************************** */
    removeReservationRoom = async (numberreservation, numberrom) => {
        let removerroom = await LMaintenanceReservation_1.default.removeReservationRoom(numberreservation, numberrom);
        return removerroom;
    };
    cancelReservation = async (numberreservation) => {
        let cancelr = await LMaintenanceReservation_1.default.cancelReservation(numberreservation);
        return cancelr;
    };
    confirmReservation = async (numberreservation) => {
        let confirm = await LMaintenanceReservation_1.default.confirmReservation(numberreservation);
        return confirm;
    };
    addReservationDetail = async (dtoreservation) => {
        let addrd = await LMaintenanceReservation_1.default.addReservationDetail(dtoreservation);
        return addrd;
    };
    //     //**************** HOTEL RESERVATION ********************** **/
    startReservation = async () => {
        const startr = await LRegisterOnlineReservation_1.default.getInstance().startReservation();
        return startr;
    };
    registerOnlineReservationDetail = async (numberrom) => {
        const ldetailr = await LRegisterOnlineReservation_1.default.getInstance().registerReservationDetail(numberrom);
        return ldetailr;
    };
    getReservationinProgress = () => {
        const getr = LRegisterOnlineReservation_1.default.getInstance().objreservation;
        return getr;
    };
    removeOnlineReservationDetail = async (numberrom) => {
        const result = await LRegisterOnlineReservation_1.default.getInstance().removeReservationDetail(numberrom);
        return result;
    };
    closeOnlineReservation = async () => {
        const lreservation = await LRegisterOnlineReservation_1.default.getInstance().closeReservation();
        return lreservation;
    };
    saveOnlineReservation = async (dtoreservation) => {
        const result = await LRegisterOnlineReservation_1.default.getInstance().saveReservation(dtoreservation);
        return result;
    };
    //    //***************** GET RESERVATION ***************** */
    getReservation = async (numberr) => {
        const greservation = await LGetReservation_1.default.getLReservation(numberr);
        return greservation;
    };
    getReservations = async () => {
        const greservations = await LGetReservation_1.default.getLReservations();
        return greservations;
    };
    getLConfirmed = async () => {
        const greservations = await LGetReservation_1.default.getLConfirmed();
        return greservations;
    };
    getLPending = async () => {
        const greservations = await LGetReservation_1.default.getLPending();
        return greservations;
    };
    getLCanceled = async () => {
        const greservations = await LGetReservation_1.default.getLCanceled();
        return greservations;
    };
    getLReservationPassenger = async (idcard) => {
        const greservations = await LGetReservation_1.default.getLReservationPassenger(idcard);
        return greservations;
    };
    getLPendingPassenger = async (idcard) => {
        const greservations = await LGetReservation_1.default.getLPendingPassenger(idcard);
        return greservations;
    };
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=ReservationController.js.map