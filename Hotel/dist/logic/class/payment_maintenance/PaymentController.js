"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const LGetPayment_1 = require("./maintenance/LGetPayment");
const LRegisterPayment_1 = require("./maintenance/LRegisterPayment");
class PaymentController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!PaymentController.instancia) {
            PaymentController.instancia = new PaymentController();
        }
        return PaymentController.instancia;
    }
    enterPassenger = async (idcard) => {
        let getrs = await LRegisterPayment_1.default.getInstance().enterPassenger(idcard);
        return getrs;
    };
    enterReservationsService = async (numberr) => {
        let datapay = await LRegisterPayment_1.default.getInstance().enterReservationsService(numberr);
        return datapay;
    };
    closePayment = async (passengeramount, datepayment) => {
        let diff = await LRegisterPayment_1.default.getInstance().closePayment(passengeramount, datepayment);
        return diff;
    };
    savePayment = async () => {
        let result = await LRegisterPayment_1.default.getInstance().savePayment();
        return result;
    };
    //***************************** GETS ************************************** */
    getLPayment = async (idpay) => {
        let datapay = await LGetPayment_1.LGetPayment.getLPayment(idpay);
        return datapay;
    };
    getLPaymentPassenger = async (idcard) => {
        let datapay = await LGetPayment_1.LGetPayment.getLPaymentPassenger(idcard);
        return datapay;
    };
    getListPayments = async () => {
        let datapay = await LGetPayment_1.LGetPayment.getListPayments();
        return datapay;
    };
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map