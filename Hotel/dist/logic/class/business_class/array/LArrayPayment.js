"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPayment = void 0;
class ArrayPayment {
    arraypayment;
    constructor(parraypayment) {
        this.arraypayment = parraypayment;
    }
    search = (idpa) => {
        let listpay = this.arraypayment;
        for (let pa of listpay) {
            if (idpa === pa.idpayment) {
                return pa;
            }
        }
        return null;
    };
    searchbyPassenger = (idcard) => {
        let listpay = this.arraypayment;
        for (let pa of listpay) {
            if (idcard === pa.passenger.idcard) {
                return pa;
            }
        }
        return null;
    };
}
exports.ArrayPayment = ArrayPayment;
//# sourceMappingURL=LArrayPayment.js.map