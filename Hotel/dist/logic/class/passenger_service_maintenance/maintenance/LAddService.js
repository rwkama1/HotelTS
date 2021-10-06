"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FactoryData_1 = require("../../../../data/FactoryData");
const logicexception_1 = require("../../../../shared/exceptions/logicexception");
const LGetPassenger_1 = require("../../passenger_maintenance/maintenace/LGetPassenger");
const LGetPassengerServices_1 = require("./LGetPassengerServices");
class LAddService {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!LAddService.instancia) {
            LAddService.instancia = new LAddService();
        }
        return LAddService.instancia;
    }
    _objps;
    get objps() {
        return this._objps;
    }
    set objps(value) {
        this._objps = value;
    }
    enterPassenger = async (idcard) => {
        let getp = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (getp === null) {
            throw new logicexception_1.LogicException("That Passenger  does not exists in the system");
        }
        let getps = await LGetPassengerServices_1.default.getPSbyPassenger(idcard);
        if (getps === null) {
            throw new logicexception_1.LogicException("That Passenger has not services");
        }
        this.objps = getps;
        return this.objps.getDTO();
    };
    addDPS = async (dtops) => {
        let lps = this.objps;
        let dataps = await lps.addDPS(dtops);
        let updatetotal = await FactoryData_1.FactoryData.getDataPassengerService().updateTotalPS(dataps);
        let addrd = await FactoryData_1.FactoryData.getDataPassengerService().addDPS(dataps);
        return addrd;
    };
}
exports.default = LAddService;
//# sourceMappingURL=LAddService.js.map