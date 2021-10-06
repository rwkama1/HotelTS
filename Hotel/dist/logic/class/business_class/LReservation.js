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
    validateDate = () => {
        if (this.arrivaldate >= this.departuredate) {
            throw new logicexception_1.LogicException("The Departure Date must be greater than Arrival Date");
        }
    };
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
        if (lroom === null) {
            throw new logicexception_1.LogicException("The Room does not exists in the system");
        }
        let lengharraydr = this.listDetailReservation.length;
        lengharraydr++;
        var detailr = new LDetailReservation_1.default(lengharraydr, lroom.value, lroom);
        var listdeatilreservation = this.listDetailReservation;
        listdeatilreservation.push(detailr);
        return detailr;
    };
    removeRD = async (numberroom) => {
        let lroom = await LGetRoom_1.LGetRoom.getLRoom(numberroom);
        if (lroom === null) {
            throw new logicexception_1.LogicException("The Room does not exists in the system");
        }
        var listdetailr = this.listDetailReservation;
        for (var i = 0; i < listdetailr.length; i++) {
            if (listdetailr[i].lroom.numberroom === lroom.numberroom) {
                listdetailr.splice(i, 1);
                break;
            }
        }
    };
    close = async (dtreservation) => {
        this.reservationdate = dtreservation.reservationdate;
        this.arrivaldate = dtreservation.arrivaldate;
        this.departuredate = dtreservation.departuredate;
        this.validateDate();
        for (let logicdr of this.listDetailReservation) {
            if (logicdr.lroom.statee === "Inactive") {
                throw new logicexception_1.LogicException("A room in the reservation detail is inactive and cannot be reserved");
            }
        }
        var listdetailr = this.listDetailReservation;
        var vtotal = 0;
        for (let d of listdetailr) {
            vtotal += d.value;
        }
        this.total = vtotal;
        let data = this.getDTO();
        return data;
    };
    save = async () => {
        let havereservrdetails = this.haveDetailR();
        if (havereservrdetails) {
            let dtoreservation = this.getDTO();
            return dtoreservation;
        }
        else {
            throw new logicexception_1.LogicException("The Detail Reservations has no items");
        }
    };
    cancel = async () => {
        this.processtatus = "Canceled";
        this.confirmationstatus = "NotConfirmed";
        let dto = this.getDTO();
        return dto;
    };
    confirm = async () => {
        this.processtatus = "Confirmed";
        this.confirmationstatus = "Confirmed";
        let dto = this.getDTO();
        return dto;
    };
    addDetailReservation = async (room) => {
        if (this.processtatus === "Confirmed") {
            // let lengthdetailr=this.listDetailReservation.length;
            // let lastelementlist=this.listDetailReservation[lengthdetailr-1];
            // let numberlrroom=lastelementlist.numberroom;
            let lroom = await LGetRoom_1.LGetRoom.getLRoom(room);
            if (lroom.statee === "Inactive") {
                throw new logicexception_1.LogicException("The Room is inactive");
            }
            if (lroom === null) {
                throw new logicexception_1.LogicException("The Room does not exists in the system");
            }
            let detailr = await this.searchDetailReservationbyroom(room);
            if (detailr != null) {
                throw new logicexception_1.LogicException("The Room already exists in the reservation");
            }
            let ldetailr = new LDetailReservation_1.default(this.listDetailReservation.length + 1, lroom.value, lroom);
            this.listDetailReservation.push(ldetailr);
            this.total = this.total + lroom.value;
            let getdto = this.getDTO();
            return getdto;
        }
        else {
            throw new logicexception_1.LogicException("Rooms can only be added to confirmed reservations");
        }
    };
    searchDetailReservationbyroom = async (numberrom) => {
        let listdetailr = this.listDetailReservation;
        for (let detailr of listdetailr) {
            if (numberrom === detailr.lroom.numberroom) {
                return detailr;
            }
        }
        return null;
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
    removeReservationDetail = async (numberrom) => {
        if (this.processtatus === "Confirmed") {
            let detailr = await this.searchDetailReservationbyroom(numberrom);
            if (detailr === null) {
                throw new logicexception_1.LogicException("The Room does not exists in the reservation");
            }
            let getdtoroom = await detailr.lroom.register();
            if (getdtoroom === true) {
                let datar = this.getDTO();
                return datar;
            }
            else {
                throw new logicexception_1.LogicException("The requested room could not be activated");
            }
        }
        else {
            throw new logicexception_1.LogicException("Rooms can only be removed to confirmed reservations");
        }
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