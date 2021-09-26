"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataException = void 0;
const customexception_1 = require("./customexception");
class DataException extends customexception_1.CustomException {
    constructor(mensaje) {
        super(mensaje);
    }
}
exports.DataException = DataException;
//# sourceMappingURL=dataexception.js.map