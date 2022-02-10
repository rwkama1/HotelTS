"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LPassenger_1 = require("../../business_class/LPassenger");
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
        let newpassenger = new LPassenger_1.default("123", "name1", "surname2", "country", "town", "address", "78789", "asd@gmail.com", "", "", "");
        let newlogicps = new LPassengerService_1.default(0, newpassenger, new Date(), new Date(), 0, "asd", []);
        this.objps = newlogicps;
        return this.objps.getDTO();
    };
    registerDPS = async (idservice) => {
        let lps = this.objps;
        let dtodps = await lps.registerDetailPS(idservice);
        return dtodps;
    };
    removeDPS = async (idservice) => {
        let lps = this.objps;
        await lps.removeDetailPS(idservice);
        return true;
    };
    closePS = async (dtops) => {
        let lps = this.objps;
        if (lps != null) {
            let data = lps.close(dtops);
            return data;
        }
        else {
            throw new logicexception_1.LogicException("The Passenger Service is null");
        }
    };
    savePS = async () => {
        let lps = this.objps;
        if (lps != null) {
            let datadps = await lps.save();
            let result = await FactoryData_1.FactoryData.getDataPassengerService().registerPassengerService(datadps);
            return result;
        }
        else {
            throw new logicexception_1.LogicException("The Passenger Service is null");
        }
    };
}
exports.default = LRegisterPassengerService;
//# sourceMappingURL=LRegisterPassengerService.js.map