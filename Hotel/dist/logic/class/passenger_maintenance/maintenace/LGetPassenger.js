"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetPassenger = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayPassenger_1 = require("../../business_class/array/LArrayPassenger");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetPassenger {
    static getLActiveSortPassengers = async () => {
        let datapasse = await this.getLPassengerss();
        let searchpasse = datapasse.getActiveSort();
        return searchpasse;
    };
    static getLPassenger = async (idcard) => {
        let datapasse = await this.getLPassengerss();
        let searchpasse = datapasse.search(idcard);
        return searchpasse;
    };
    static getLPassengerbyname = async (name, surname) => {
        let datapasse = await this.getLPassengerss();
        let searchpasse = datapasse.searchbyname(name, surname);
        return searchpasse;
    };
    static getLPassengerss = async () => {
        let arraypassenger = [];
        let datapase = await FactoryData_1.FactoryData.getDataPassenger().getPassengers();
        for (var dtpasse of datapase) {
            const logicpassenger = instanceBusinessClass_1.InstanceLogicClass.instanceLPassenger(dtpasse);
            arraypassenger.push(logicpassenger);
        }
        let arraylogicpassenger = new LArrayPassenger_1.ArrayPassenger(arraypassenger);
        return arraylogicpassenger;
    };
}
exports.LGetPassenger = LGetPassenger;
//# sourceMappingURL=LGetPassenger.js.map