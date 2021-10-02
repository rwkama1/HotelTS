"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LPassengerService_1 = require("../../business_class/LPassengerService");
class LRegisterPassengerService {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LRegisterPassengerService.instancia) {
            LRegisterPassengerService.instancia = new LRegisterPassengerService();
        }
        return LRegisterPassengerService.instancia;
    }
    _objps;
    get objps() {
        return this._objps;
    }
    set objps(value) {
        this._objps = value;
    }
    startPS = async () => {
        let newlogicps = new LPassengerService_1.default(0, null, new Date(), new Date(), 0, "asd", []);
        this.objps = newlogicps;
        return this.objps;
    };
    registerDPS = async (idservice) => {
        let lps = this.objps;
        let logicdps = await lps.registerDetailPS(idservice);
        return logicdps;
    };
    removeDPS = async (idservice) => {
        let lps = this.objps;
        await lps.removeDetailPS(idservice);
        return true;
    };
    closePS = async () => {
        let lps = this.objps;
        if (lps != null) {
            let dtops = lps.close();
            return dtops;
        }
        else {
            throw new logicexception_1.LogicException("The Passenger Service is null");
        }
    };
}
exports.default = LRegisterPassengerService;
//# sourceMappingURL=LRegisterPassengerService.js.map