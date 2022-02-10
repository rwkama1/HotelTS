"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOReservation {
    numberreservation;
    reservationdate;
    arrivaldate;
    departuredate;
    processtatus;
    confirmationstatus;
    origin;
    total;
    idcardpassenger;
    listDetailReservation;
    constructor(pnumberreservation, preservationdate, parrivaldate, pdeparturedate, pprocesstatus, pconfirmationstatus, porigin, ptotal, pidcardpassenger, plistDetailReservation) {
        this.numberreservation = pnumberreservation;
        this.reservationdate = preservationdate;
        this.arrivaldate = parrivaldate;
        this.departuredate = pdeparturedate;
        this.processtatus = pprocesstatus;
        this.confirmationstatus = pconfirmationstatus;
        this.origin = porigin;
        this.total = ptotal;
        this.idcardpassenger = pidcardpassenger;
        this.listDetailReservation = plistDetailReservation;
    }
}
exports.default = DTOReservation;
//# sourceMappingURL=DTOReservation.js.map