"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCRUDUser = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../../encrypt/hashPassword");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetUsers_1 = require("./LGetUsers");
class LCRUDUser {
    static registerUser = async (dtouser) => {
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(logicuser.idcard);
        if (usersearch != null) {
            if (usersearch.statee === "Active") {
                throw new logicexception_1.LogicException("That User already exists in the system");
            }
            else {
                const actuser = await FactoryData_1.FactoryData.getDataUser().changeStateUser(usersearch.idcard, "Active");
                return actuser;
            }
        }
        logicuser.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(logicuser.password);
        logicuser.password = passh.hash;
        logicuser.hashh = passh.salt;
        const dto = logicuser.getDTO();
        const reguser = await FactoryData_1.FactoryData.getDataUser().registerUser(dto);
        return reguser;
    };
    static updateUser = async (dtouser) => {
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(logicuser.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User do not exists in the system");
        }
        if (usersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That User is inactive");
        }
        logicuser.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(logicuser.password);
        logicuser.password = passh.hash;
        logicuser.hashh = passh.salt;
        const dto = logicuser.getDTO();
        const updateuser = await FactoryData_1.FactoryData.getDataUser().updateUser(dto);
        return updateuser;
        // 
    };
    static inactivateUser = async (dtouser) => {
        let usersearch = await LGetUsers_1.LGetUsers.getLUser(dtouser.idcard);
        if (usersearch === null) {
            throw new logicexception_1.LogicException("That User do not exists in the system");
        }
        if (usersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That User is inactive");
        }
        const deluser = await FactoryData_1.FactoryData.getDataUser().changeStateUser(usersearch.idcard, "Inactive");
        return deluser;
    };
}
exports.LCRUDUser = LCRUDUser;
//# sourceMappingURL=LCUDUsers.js.map