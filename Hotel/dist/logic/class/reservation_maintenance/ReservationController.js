"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const LGetReservation_1 = require("./maintenance/LGetReservation");
const LRegisterHotelReservation_1 = require("./maintenance/LRegisterHotelReservation");
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
    saveReservation = async (reservationdate, arrivaldate, departuredate) => {
        const result = await LRegisterHotelReservation_1.default.getInstance().saveReservation(reservationdate, arrivaldate, departuredate);
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