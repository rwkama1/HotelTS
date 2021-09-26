"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCUDRoom = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
class LCUDRoom {
    static registerRoom = async (dtroom) => {
        const regroom = await FactoryData_1.FactoryData.getDataRoom().registerRoom(dtroom);
        return regroom;
    };
    static updateRoom = async (dtroom) => {
        const updateroom = await FactoryData_1.FactoryData.getDataRoom().updateRoom(dtroom);
        return updateroom;
    };
    static changeStateRoom = async (numberroom, state) => {
        const del = await FactoryData_1.FactoryData.getDataRoom().changeStateRoom(numberroom, state);
        return del;
    };
}
exports.LCUDRoom = LCUDRoom;
//# sourceMappingURL=LCUDRoom.js.map