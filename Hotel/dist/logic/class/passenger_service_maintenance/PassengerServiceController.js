"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerServiceController = void 0;
const LRegisterPassengerService_1 = require("./maintenance/LRegisterPassengerService");
class PassengerServiceController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!PassengerServiceController.instancia) {
            PassengerServiceController.instancia = new PassengerServiceController();
        }
        return PassengerServiceController.instancia;
    }
    startPS = async () => {
        const startp = await LRegisterPassengerService_1.default.getInstance().startPS();
        return startp;
    };
    registerDPS = async (idservice) => {
        const regp = await LRegisterPassengerService_1.default.getInstance().registerDPS(idservice);
        return regp;
    };
}
exports.PassengerServiceController = PassengerServiceController;
//# sourceMappingURL=PassengerServiceController.js.map