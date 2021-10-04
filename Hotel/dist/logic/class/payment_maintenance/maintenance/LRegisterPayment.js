"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const LPayment_1 = require("../../business_class/LPayment");
class LRegisterPayment {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LRegisterPayment.instancia) {
            LRegisterPayment.instancia = new LRegisterPayment();
        }
        return LRegisterPayment.instancia;
    }
    _objpayment;
    get objpayment() {
        return this._objpayment;
    }
    set objpayment(value) {
        this._objpayment = value;
    }
    enterPassenger = async (idcard) => {
        let newlogicpay = new LPayment_1.default(0, null, null, null, 10, 5, new Date());
        this.objpayment = newlogicpay;
        let getreservationp = await this.objpayment.enterPassenger(idcard);
        return getreservationp;
    };
    enterReservationsService = async (numberr) => {
        let datar = await this.objpayment.enterReservationsService(numberr);
        return datar;
    };
    closePayment = async (passengeramount, datepayment) => {
        let diff = await this.objpayment.close(passengeramount, datepayment);
        return diff;
    };
    savePayment = async () => {
        let datap = this.objpayment.getDTO();
        let savepay = await FactoryData_1.FactoryData.getDataPayment().registerPayment(datap);
        return savepay;
    };
}
exports.default = LRegisterPayment;
//# sourceMappingURL=LRegisterPayment.js.map