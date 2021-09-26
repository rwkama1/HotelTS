"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDPassenger = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
class LCUDPassenger {
    static registerPassenger = async (dtpassenger) => {
        const regpass = await FactoryData_1.FactoryData.getDataPassenger().registerPassenger(dtpassenger);
        return regpass;
    };
    static updatePassenger = async (dtpassenger) => {
        const updpas = await FactoryData_1.FactoryData.getDataPassenger().updatePassenger(dtpassenger);
        return updpas;
    };
    static changestatePassenger = async (idcard, state) => {
        const del = await FactoryData_1.FactoryData.getDataPassenger().changeStatePassenger(idcard, state);
        return del;
    };
}
exports.LCUDPassenger = LCUDPassenger;
//# sourceMappingURL=LCUDPassenger.js.map