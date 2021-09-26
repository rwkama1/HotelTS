"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCRUDUser = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
class LCRUDUser {
    static registerUser = async (dtuser) => {
        const reguser = await FactoryData_1.FactoryData.getDataUser().registerUser(dtuser);
        return reguser;
    };
    static updateUser = async (dtuser) => {
        const upduser = await FactoryData_1.FactoryData.getDataUser().updateUser(dtuser);
        return upduser;
    };
    static changestateUser = async (idcard, state) => {
        const del = await FactoryData_1.FactoryData.getDataUser().changeStateUser(idcard, state);
        return del;
    };
}
exports.LCRUDUser = LCRUDUser;
//# sourceMappingURL=LCUDUsers.js.map