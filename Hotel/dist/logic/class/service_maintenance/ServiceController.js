"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const instanceBusinessClass_1 = require("../extras/instanceBusinessClass");
const LGetService_1 = require("./maintenance/LGetService");
class ServiceController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!ServiceController.instancia) {
            ServiceController.instancia = new ServiceController();
        }
        return ServiceController.instancia;
    }
    //************ CRUD ********************** */
    registerService = async (dtservice) => {
        const logics = instanceBusinessClass_1.InstanceLogicClass.instanceLService(dtservice);
        const result = await logics.register();
        return result;
    };
    updateService = async (dtservice) => {
        const logics = instanceBusinessClass_1.InstanceLogicClass.instanceLService(dtservice);
        const result = await logics.update();
        return result;
    };
    disableService = async (dtservice) => {
        const logics = instanceBusinessClass_1.InstanceLogicClass.instanceLService(dtservice);
        const result = await logics.disable();
        return result;
    };
    getService = async (idservice) => {
        const gservice = await LGetService_1.LGetService.getLService(idservice);
        return gservice;
    };
    //***************** GET SERVICES ***************** */
    getServices = async () => {
        const gservices = await LGetService_1.LGetService.getLServices();
        return gservices;
    };
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=ServiceController.js.map