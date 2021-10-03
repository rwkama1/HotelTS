"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayPassengerService_1 = require("../../business_class/array/LArrayPassengerService");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetPassengerService {
    static getListPS = async () => {
        let arrayps = [];
        let dataps = await FactoryData_1.FactoryData.getDataPassengerService().listPassengersServices();
        for (let ps of dataps) {
            const logicps = await instanceBusinessClass_1.InstanceLogicClass.instanceLPS(ps);
            arrayps.push(logicps);
        }
        let arraylogicps = new LArrayPassengerService_1.ArrayPassengerService(arrayps);
        return arraylogicps;
    };
    static getPS = async (id) => {
        let dataps = await this.getListPS();
        let searchps = dataps.search(id);
        return searchps;
    };
    static getPSbyPassenger = async (idcard) => {
        let dataps = await this.getListPS();
        let searchr = dataps.searchbyPassenger(idcard);
        return searchr;
    };
}
exports.default = LGetPassengerService;
//# sourceMappingURL=LGetPassengerServices.js.map