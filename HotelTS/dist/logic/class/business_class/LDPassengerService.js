"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODPassengerService_1 = require("../../../shared/entity/DTODPassengerService");
class LogicDPassengerService {
    _numberdetailps;
    _service;
    _amount;
    //GETTERS
    get numberdetailps() {
        return this._numberdetailps;
    }
    get service() {
        return this._service;
    }
    get amount() {
        return this._amount;
    }
    //SETTERS
    set numberdetailps(value) {
        this._numberdetailps = value;
    }
    set service(value) {
        this._service = value;
    }
    set amount(value) {
        this._amount = value;
    }
    getDTO = () => {
        let dtodps = new DTODPassengerService_1.default(this.numberdetailps, this.service.idservice, this.amount);
        return dtodps;
    };
    constructor(pnumberdps, pservice, pamount) {
        this.numberdetailps = pnumberdps;
        this.service = pservice;
        this.amount = pamount;
    }
}
exports.default = LogicDPassengerService;
//# sourceMappingURL=LDPassengerService.js.map