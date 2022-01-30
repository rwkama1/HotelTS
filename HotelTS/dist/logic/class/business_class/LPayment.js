"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOPayment_1 = require("../../../shared/entity/DTOPayment");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetPassenger_1 = require("../passenger_maintenance/maintenace/LGetPassenger");
const LGetPassengerServices_1 = require("../passenger_service_maintenance/maintenance/LGetPassengerServices");
const LGetReservation_1 = require("../reservation_maintenance/maintenance/LGetReservation");
class LogicPayment {
    _idpayment;
    _reservation;
    _passengerservice;
    _passengeramount;
    _passenger;
    _totalrs;
    _date;
    //**************** GETTERS *********************** */
    get idpayment() {
        return this._idpayment;
    }
    get reservation() {
        return this._reservation;
    }
    get passengerservice() {
        return this._passengerservice;
    }
    get passengeramount() {
        return this._passengeramount;
    }
    get totalrs() {
        return this._totalrs;
    }
    get date() {
        return this._date;
    }
    get passenger() {
        return this._passenger;
    }
    //**************** SETTERS *********************** */
    set idpayment(value) {
        this._idpayment = value;
    }
    set reservation(value) {
        this._reservation = value;
    }
    set passengerservice(value) {
        this._passengerservice = value;
    }
    set passengeramount(value) {
        if (value <= 0) {
            throw new logicexception_1.LogicException("The Passenger amount must be greater than 0");
        }
        if (this.totalrs > value) {
            throw new logicexception_1.LogicException("The Total must be less than the passenger amount");
        }
        this._passengeramount = value;
    }
    set totalrs(value) {
        if (value <= 0) {
            throw new logicexception_1.LogicException("The Total must be greater than 0");
        }
        this._totalrs = value;
    }
    set date(value) {
        this._date = value;
    }
    set passenger(value) {
        this._passenger = value;
    }
    getDTO = () => {
        let dtopay = new DTOPayment_1.default(this.idpayment, this.passenger.idcard, this.reservation.numberreservation, this.passengerservice.numberps, this.passengeramount, this.totalrs, this.date);
        return dtopay;
    };
    enterPassenger = async (idcard) => {
        let getpassenger = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (getpassenger === null) {
            throw new logicexception_1.LogicException("That Passenger does not exists in the system");
        }
        let getreservations = await LGetReservation_1.default.getLReservationPassenger(getpassenger.idcard);
        if (getreservations === null) {
            throw new logicexception_1.LogicException("That Passenger has not reservations");
        }
        this.passenger = getpassenger;
        return getreservations;
    };
    enterReservationsService = async (numberr) => {
        let getr = await LGetReservation_1.default.getLReservation(numberr);
        if (getr === null) {
            throw new logicexception_1.LogicException("That Reservation does not exists in the system");
        }
        let getps = await LGetPassengerServices_1.default.getPSbyPassenger(this.passenger.idcard);
        if (getps === null) {
            throw new logicexception_1.LogicException("That Passenger has not services");
        }
        this.reservation = getr;
        this.passengerservice = getps;
        this.totalrs = this.reservation.total + this.passengerservice.total;
        let datapay = this.getDTO();
        return datapay;
    };
    close = async (ppassengeramount, datepayment) => {
        this.date = datepayment;
        this.passengeramount = ppassengeramount;
        return this.passengeramount - this.totalrs;
    };
    constructor(pidpayment, ppassenger, preservation, ppassengerservice, ppassengeramount, ptotalrs, pdate) {
        this.idpayment = pidpayment;
        this.passenger = ppassenger;
        this.reservation = preservation;
        this.passengerservice = ppassengerservice;
        this.passengeramount = ppassengeramount;
        this.totalrs = ptotalrs;
        this.date = pdate;
    }
}
exports.default = LogicPayment;
//# sourceMappingURL=LPayment.js.map