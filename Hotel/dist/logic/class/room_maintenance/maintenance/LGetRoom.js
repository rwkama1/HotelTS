"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetRoom = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayRoom_1 = require("../../business_class/array/LArrayRoom");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetRoom {
    static getLActiveSortRoom = async () => {
        let dataroom = await this.getLRooms();
        let searchroom = dataroom.getActiveSort();
        return searchroom;
    };
    static getLRoom = async (numberroom) => {
        let dataroom = await this.getLRooms();
        let searchroom = dataroom.search(numberroom);
        return searchroom;
    };
    static getLRooms = async () => {
        let arrayroom = [];
        let dataroom = await FactoryData_1.FactoryData.getDataRoom().getRooms();
        for (var dtroom of dataroom) {
            const logicroom = instanceBusinessClass_1.InstanceLogicClass.instanceLRoom(dtroom);
            arrayroom.push(logicroom);
        }
        let arraylogicroom = new LArrayRoom_1.ArrayRoom(arrayroom);
        return arraylogicroom;
    };
}
exports.LGetRoom = LGetRoom;
//# sourceMappingURL=LGetRoom.js.map