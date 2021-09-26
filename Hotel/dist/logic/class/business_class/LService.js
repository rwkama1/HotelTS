"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOService_1 = require("../../../shared/entity/DTOService");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LCUDService_1 = require("../service_maintenance/maintenance/LCUDService");
const LGetService_1 = require("../service_maintenance/maintenance/LGetService");
class LogicService {
    _idservice;
    _name;
    _value;
    _statee;
    //GETTERS
    get idservice() {
        return this._idservice;
    }
    get name() {
        return this._name;
    }
    get value() {
        return this._value;
    }
    get state() {
        return this._statee;
    }
    //SETTERS
    set idservice(value) {
        this._idservice = value;
    }
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set value(value) {
        if (value <= 0) {
            throw new logicexception_1.LogicException("The value must be grater than 0");
        }
        this._value = value;
    }
    set state(value) {
        this._statee = value;
    }
    register = async () => {
        let servicesh = await LGetService_1.LGetService.getLService(this.idservice);
        if (servicesh != null) {
            if (servicesh.state === "Active") {
                throw new logicexception_1.LogicException("That Service already exists in the system");
            }
            else {
                const actservice = await LCUDService_1.LCUDService.changeStateService(servicesh.idservice, "Active");
                return actservice;
            }
        }
        const dto = this.getDTO();
        const regs = await LCUDService_1.LCUDService.registerService(dto);
        return regs;
    };
    update = async () => {
        let serviceh = await LGetService_1.LGetService.getLService(this.idservice);
        if (serviceh === null) {
            throw new logicexception_1.LogicException("That Service do not exists in the system");
        }
        if (serviceh.state === "Inactive") {
            throw new logicexception_1.LogicException("That Service is inactive");
        }
        const dto = this.getDTO();
        const upserv = await LCUDService_1.LCUDService.updateService(dto);
        return upserv;
    };
    disable = async () => {
        let serviceh = await LGetService_1.LGetService.getLService(this.idservice);
        if (serviceh === null) {
            throw new logicexception_1.LogicException("That Service do not exists in the system");
        }
        if (serviceh.state === "Inactive") {
            throw new logicexception_1.LogicException("That Service is inactive");
        }
        const dto = this.getDTO();
        const dels = await LCUDService_1.LCUDService.changeStateService(dto.idservice, "Inactive");
        return dels;
    };
    getDTO = () => {
        let dtserv = new DTOService_1.default(this.idservice, this.name, this.value, this.state);
        return dtserv;
    };
    constructor(pidservice, pname, pvalue, pstate) {
        this.idservice = pidservice;
        this.name = pname;
        this.value = pvalue;
        this.state = pstate;
    }
}
exports.default = LogicService;
//# sourceMappingURL=LService.js.map