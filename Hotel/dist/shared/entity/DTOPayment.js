"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOPayment {
    idpayment;
    numberreservation;
    idpassengerservice;
    passengeramount;
    totalrs;
    date;
    idcardpassenger;
    constructor(pidpayment, pidcardpassenger, pnumberreservation, pidpassengerservice, ppassengeramount, ptotalrs, pdate) {
        this.idpayment = pidpayment;
        this.idcardpassenger = pidcardpassenger;
        this.numberreservation = pnumberreservation;
        this.idpassengerservice = pidpassengerservice;
        this.passengeramount = ppassengeramount;
        this.totalrs = ptotalrs;
        this.date = pdate;
    }
}
exports.default = DTOPayment;
//# sourceMappingURL=DTOPayment.js.map