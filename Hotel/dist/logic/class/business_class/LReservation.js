"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOReservation_1 = require("../../../shared/entity/DTOReservation");
const DTOReservationDetail_1 = require("../../../shared/entity/DTOReservationDetail");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetPassenger_1 = require("../passenger_maintenance/maintenace/LGetPassenger");
const LGetRoom_1 = require("../room_maintenance/maintenance/LGetRoom");
const LDetailReservation_1 = require("./LDetailReservation");
class LogicReservation {
    _numberreservation;
    _reservationdate;
    _arrivaldate;
    _departuredate;
    _processtatus;
    _confirmationstatus;
    _origin;
    _total;
    _passenger;
    _listDetailReservation;
    //GETTERS
    get numberreservation() {
        return this._numberreservation;
    }
    get reservationdate() {
        return this._reservationdate;
    }
    get arrivaldate() {
        return this._arrivaldate;
    }
    get departuredate() {
        return this._departuredate;
    }
    get processtatus() {
        return this._processtatus;
    }
    get confirmationstatus() {
        return this._confirmationstatus;
    }
    get origin() {
        return this._origin;
    }
    get total() {
        return this._total;
    }
    get passenger() {
        return this._passenger;
    }
    get listDetailReservation() {
        return this._listDetailReservation;
    }
    //SETTERS
    set numberreservation(value) {
        this._numberreservation = value;
    }
    set reservationdate(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Reservation Date is null");
        }
        this._reservationdate = value;
    }
    set arrivaldate(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Arrival Date is null");
        }
        this._arrivaldate = value;
    }
    set departuredate(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Departure Date is null");
        }
        this._departuredate = value;
    }
    set processtatus(value) {
        if (value.trim() != "Pending" && value.trim() != "Confirmed" && value.trim() != "Canceled") {
            throw new logicexception_1.LogicException("The Process Status can only be Pending, Confirmed, Canceled");
        }
        this._processtatus = value;
    }
    set confirmationstatus(value) {
        if (value.trim() != "NotConfirmed" && value.trim() != "Confirmed") {
            throw new logicexception_1.LogicException("The Confirmation Status can only be Not Confirmed or Confirmed");
        }
        this._confirmationstatus = value;
    }
    set origin(value) {
        if (value.trim() != "Hotel" && value.trim() != "Online") {
            throw new logicexception_1.LogicException("The Confirmation Status can only be Hotel or Online");
        }
        this._origin = value;
    }
    set total(value) {
        this._total = value;
    }
    set passenger(value) {
        this._passenger = value;
    }
    set listDetailReservation(value) {
        this._listDetailReservation = value;
    }
    enterPassenger = async (idcard) => {
        const getPassenger = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (getPassenger === null) {
            return false;
        }
        else {
            this.passenger = getPassenger;
            let lpassenger = this.passenger;
            return lpassenger;
        }
    };
    registerReservationDetail = async (numberroom) => {
        let lroom = await LGetRoom_1.LGetRoom.getLRoom(numberroom);
        let lengharraydr = this.listDetailReservation.length;
        lengharraydr++;
        var detailr = new LDetailReservation_1.default(lengharraydr, lroom.value, lroom);
        var listdeatilreservation = this.listDetailReservation;
        listdeatilreservation.push(detailr);
        return detailr;
    };
    removeRD = async (numberroom) => {
        let lroom = await LGetRoom_1.LGetRoom.getLRoom(numberroom);
        var listdetailr = this.listDetailReservation;
        for (var i = 0; i < listdetailr.length; i++) {
            if (listdetailr[i].lroom.numberroom === lroom.numberroom) {
                listdetailr.splice(i, 1);
                break;
            }
        }
    };
    close = async () => {
        var listdetailr = this.listDetailReservation;
        var vtotal = 0;
        for (let d of listdetailr) {
            vtotal += d.value;
        }
        this.total = vtotal;
    };
    save = async (dtreservation) => {
        for (let logicdr of this.listDetailReservation) {
            if (logicdr.lroom.statee === "Inactive") {
                throw new logicexception_1.LogicException("A room in the reservation detail is inactive and cannot be reserved");
            }
        }
        this.reservationdate = dtreservation.reservationdate;
        this.arrivaldate = dtreservation.arrivaldate;
        this.departuredate = dtreservation.departuredate;
        let havereservrdetails = this.haveDetailR();
        if (havereservrdetails) {
            let dtoreservation = this.getDTO();
            return dtoreservation;
        }
        else {
            throw new logicexception_1.LogicException("The Detail Reservations has no items");
        }
    };
    haveDetailR() {
        var listdetailr = this.listDetailReservation;
        var haveDR = listdetailr.length > 0;
        return haveDR;
    }
    getDTO = () => {
        let arraydetailreservation = [];
        for (let logicdetailr of this.listDetailReservation) {
            let dtodetailr = new DTOReservationDetail_1.default(logicdetailr.numberrd, logicdetailr.value, logicdetailr.lroom.numberroom);
            arraydetailreservation.push(dtodetailr);
        }
        let dtoreservation = new DTOReservation_1.default(this.numberreservation, this.reservationdate, this.arrivaldate, this.departuredate, this.processtatus, this.confirmationstatus, this.origin, this.total, this.passenger.idcard, arraydetailreservation);
        return dtoreservation;
    };
    constructor(pnumberreservation, preservationdate, parrivaldate, pdeparturedate, pprocesstatus, pconfirmationstatus, porigin, ptotal, ppassenger, plistDetailReservation) {
        this.numberreservation = pnumberreservation;
        this.reservationdate = preservationdate;
        this.arrivaldate = parrivaldate;
        this.departuredate = pdeparturedate;
        this.processtatus = pprocesstatus;
        this.confirmationstatus = pconfirmationstatus;
        this.origin = porigin;
        this.total = ptotal;
        this.passenger = ppassenger;
        this.listDetailReservation = plistDetailReservation;
    }
}
exports.default = LogicReservation;
//# sourceMappingURL=LReservation.js.map