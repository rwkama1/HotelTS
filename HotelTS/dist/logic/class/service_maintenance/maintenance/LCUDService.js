"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDService = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
class LCUDService {
    static registerService = async (dtservice) => {
        const regs = await FactoryData_1.FactoryData.getDataService().registerService(dtservice);
        return regs;
    };
    static updateService = async (dtservice) => {
        const upser = await FactoryData_1.FactoryData.getDataService().updateService(dtservice);
        return upser;
    };
    static changeStateService = async (idservice, state) => {
        const del = await FactoryData_1.FactoryData.getDataService().changeStateService(idservice, state);
        return del;
    };
}
exports.LCUDService = LCUDService;
//# sourceMappingURL=LCUDService.js.map