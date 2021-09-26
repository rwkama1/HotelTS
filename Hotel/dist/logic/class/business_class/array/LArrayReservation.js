"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayReservation = void 0;
class ArrayReservation {
    arrayreservation;
    constructor(parrayreservation) {
        this.arrayreservation = parrayreservation;
    }
    search = (numberreservation) => {
        let listreservation = this.arrayreservation;
        for (let reservation of listreservation) {
            if (numberreservation === reservation.numberreservation) {
                return reservation;
            }
        }
        return null;
    };
}
exports.ArrayReservation = ArrayReservation;
//# sourceMappingURL=LArrayReservation.js.map