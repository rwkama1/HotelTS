"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayService = void 0;
class ArrayService {
    arrayservice;
    constructor(parrayservice) {
        this.arrayservice = parrayservice;
    }
    search = (id) => {
        let listservice = this.arrayservice;
        for (let service of listservice) {
            if (id === service.idservice) {
                return service;
            }
        }
        return null;
    };
}
exports.ArrayService = ArrayService;
//# sourceMappingURL=LArrayService.js.map