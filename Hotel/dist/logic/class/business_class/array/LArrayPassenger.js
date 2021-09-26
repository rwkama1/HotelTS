"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayPassenger = void 0;
class ArrayPassenger {
    arraypassenger;
    constructor(parraypassenger) {
        this.arraypassenger = parraypassenger;
    }
    search = (idcard) => {
        let listpassenger = this.arraypassenger;
        for (let passenger of listpassenger) {
            if (idcard === passenger.idcard) {
                return passenger;
            }
        }
        return null;
    };
    getActiveSort = () => {
        let listpassenger = this.arraypassenger;
        let newarray = [];
        for (let passenger of listpassenger) {
            if (passenger.statee === "Active") {
                newarray.push(passenger);
            }
        }
        const sortarray = newarray.sort((a, b) => a.name.localeCompare(b.name));
        return sortarray;
    };
}
exports.ArrayPassenger = ArrayPassenger;
//# sourceMappingURL=LArrayPassenger.js.map