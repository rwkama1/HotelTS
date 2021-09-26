"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetService = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayService_1 = require("../../business_class/array/LArrayService");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetService {
    static getLService = async (idservice) => {
        let dataservice = await this.getLServices();
        let searchserv = dataservice.search(idservice);
        return searchserv;
    };
    static getLServices = async () => {
        let arrays = [];
        let dataservice = await FactoryData_1.FactoryData.getDataService().getServices();
        for (var dts of dataservice) {
            const logicservice = instanceBusinessClass_1.InstanceLogicClass.instanceLService(dts);
            arrays.push(logicservice);
        }
        let arraylogicservice = new LArrayService_1.ArrayService(arrays);
        return arraylogicservice;
    };
}
exports.LGetService = LGetService;
//# sourceMappingURL=LGetService.js.map