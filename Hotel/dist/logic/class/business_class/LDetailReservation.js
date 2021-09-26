"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logicexception_1 = require("../../../shared/exceptions/logicexception");
class LogicReservationDetail {
    _numberrd;
    _value;
    _lroom;
    //GETTERS
    get numberrd() {
        return this._numberrd;
    }
    get value() {
        return this._value;
    }
    get lroom() {
        return this._lroom;
    }
    //SETTERS
    set numberrd(value) {
        this._numberrd = value;
    }
    set value(value) {
        if (value <= 0) {
            throw new logicexception_1.LogicException("The Value must be greater than 0");
        }
        this._value = value;
    }
    set lroom(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Room is null");
        }
        this._lroom = value;
    }
    constructor(pnumberrd, pvalue, plroom) {
        this.numberrd = pnumberrd;
        this.value = pvalue;
        this.lroom = plroom;
    }
}
exports.default = LogicReservationDetail;
//# sourceMappingURL=LDetailReservation.js.map