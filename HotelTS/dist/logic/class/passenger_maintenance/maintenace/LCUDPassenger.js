"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDPassenger = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const hashPassword_1 = require("../../encrypt/hashPassword");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
const LGetPassenger_1 = require("./LGetPassenger");
class LCUDPassenger {
    static registerPassenger = async (dtpassenger) => {
        const logicp = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpassenger);
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(dtpassenger.idcard);
        if (passengersearch != null) {
            if (passengersearch.statee === "Active") {
                throw new logicexception_1.LogicException("That Passenger already exists in the system");
            }
            else {
                const actpasse = await FactoryData_1.FactoryData.getDataPassenger().changeStatePassenger(passengersearch.idcard, "Active");
                return actpasse;
            }
        }
        logicp.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(logicp.password);
        logicp.password = passh.hash;
        logicp.salt = passh.salt;
        const dto = logicp.getDTO();
        const reguser = await FactoryData_1.FactoryData.getDataPassenger().registerPassenger(dto);
        return reguser;
        // const regpass=await FactoryData.getDataPassenger().registerPassenger(dtpassenger);
        // return regpass;
    };
    static updatePassenger = async (dtpassenger) => {
        const logicp = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpassenger);
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(logicp.idcard);
        if (passengersearch === null) {
            throw new logicexception_1.LogicException("That Passenger do not exists in the system");
        }
        if (passengersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Passenger is inactive");
        }
        logicp.validatePassword();
        const passh = await hashPassword_1.default.hashPassword(logicp.password);
        logicp.password = passh.hash;
        logicp.salt = passh.salt;
        const dto = logicp.getDTO();
        const reguser = await FactoryData_1.FactoryData.getDataPassenger().updatePassenger(dto);
        return reguser;
        //  const updpas=await FactoryData.getDataPassenger().updatePassenger(dtpassenger);
        //   return updpas;
    };
    static inactivatePassenger = async (dtouser) => {
        let passengersearch = await LGetPassenger_1.LGetPassenger.getLPassenger(dtouser.idcard);
        if (passengersearch === null) {
            throw new logicexception_1.LogicException("That Passenger do not exists in the system");
        }
        if (passengersearch.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Passenger is inactive");
        }
        const deluser = await FactoryData_1.FactoryData.getDataPassenger().changeStatePassenger(passengersearch.idcard, "Inactive");
        return deluser;
    };
}
exports.LCUDPassenger = LCUDPassenger;
//# sourceMappingURL=LCUDPassenger.js.map