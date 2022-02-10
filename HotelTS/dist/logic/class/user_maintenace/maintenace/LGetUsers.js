"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetUsers = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetUsers {
    static getLUser = async (idcard) => {
        let datausers = await FactoryData_1.FactoryData.getDataUser().getUserbyID(idcard);
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(datausers);
        return logicuser;
    };
}
exports.LGetUsers = LGetUsers;
//# sourceMappingURL=LGetUsers.js.map