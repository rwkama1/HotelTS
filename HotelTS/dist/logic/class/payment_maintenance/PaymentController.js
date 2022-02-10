"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
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
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayReservation(getrs);
        return arraydto;
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
        if (datapay === null) {
            throw new logicexception_1.LogicException("The Payment does not exists in the system");
        }
        return datapay.getDTO();
    };
    getLPaymentPassenger = async (idcard) => {
        let datapay = await LGetPayment_1.LGetPayment.getLPaymentPassenger(idcard);
        if (datapay === null) {
            throw new logicexception_1.LogicException("The Payment does not exists in the system");
        }
        return datapay.getDTO();
    };
    getListPayments = async () => {
        let datapay = await LGetPayment_1.LGetPayment.getListPayments();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayPayment(datapay.arraypayment);
        return arraydto;
    };
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map