"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const LGetReservation_1 = require("./maintenance/LGetReservation");
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
    //************************** ONLINE RESERVATION ******************************** */
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
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=ReservationController.js.map