"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetPassenger = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetPassenger {
    static getLPassenger = async (idcard) => {
        let datapassenger = await FactoryData_1.FactoryData.getDataPassenger().getPassengerbyID(idcard);
        const logicpassenger = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(datapassenger);
        return logicpassenger;
    };
}
exports.LGetPassenger = LGetPassenger;
//# sourceMappingURL=LGetPassenger.js.map