"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicException = void 0;
const customexception_1 = require("./customexception");
class LogicException extends customexception_1.CustomException {
    constructor(mensaje) {
        super(mensaje);
    }
}
exports.LogicException = LogicException;
//# sourceMappingURL=logicexception.js.map