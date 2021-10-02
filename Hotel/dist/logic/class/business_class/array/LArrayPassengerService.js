"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPassengerService = void 0;
class ArrayPassengerService {
    arrayps;
    constructor(parrayps) {
        this.arrayps = parrayps;
    }
    search = (idps) => {
        let listps = this.arrayps;
        for (let ps of listps) {
            if (idps === ps.numberps) {
                return ps;
            }
        }
        return null;
    };
}
exports.ArrayPassengerService = ArrayPassengerService;
//# sourceMappingURL=LArrayPassengerService.js.map