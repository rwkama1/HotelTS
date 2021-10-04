"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetPayment = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayPayment_1 = require("../../business_class/array/LArrayPayment");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetPayment {
    static getLPayment = async (idpay) => {
        let datapay = await this.getListPayments();
        let searchpay = datapay.search(idpay);
        return searchpay;
    };
    static getLPaymentPassenger = async (idcard) => {
        let datapay = await this.getListPayments();
        let searchpay = datapay.searchbyPassenger(idcard);
        return searchpay;
    };
    static getListPayments = async () => {
        let arrayp = [];
        let datap = await FactoryData_1.FactoryData.getDataPayment().getPayments();
        for (var dtop of datap) {
            const logicpayment = await instanceBusinessClass_1.InstanceLogicClass.instancePayment(dtop);
            arrayp.push(logicpayment);
        }
        let arraylogicpayment = new LArrayPayment_1.ArrayPayment(arrayp);
        return arraylogicpayment;
    };
}
exports.LGetPayment = LGetPayment;
//# sourceMappingURL=LGetPayment.js.map