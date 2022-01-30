"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayRoom = void 0;
class ArrayRoom {
    arrayroom;
    constructor(parrayroom) {
        this.arrayroom = parrayroom;
    }
    search = (number) => {
        let listroom = this.arrayroom;
        for (let room of listroom) {
            if (number === room.numberroom) {
                return room;
            }
        }
        return null;
    };
    getActiveSort = () => {
        let listroom = this.arrayroom;
        let newarray = [];
        for (let room of listroom) {
            if (room.statee === "Active") {
                newarray.push(room);
            }
        }
        const sortarray = newarray.sort();
        return sortarray;
    };
}
exports.ArrayRoom = ArrayRoom;
//# sourceMappingURL=LArrayRoom.js.map