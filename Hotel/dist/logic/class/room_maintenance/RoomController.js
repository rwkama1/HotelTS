"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const instanceBusinessClass_1 = require("../extras/instanceBusinessClass");
const LGetRoom_1 = require("./maintenance/LGetRoom");
class RoomController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!RoomController.instancia) {
            RoomController.instancia = new RoomController();
        }
        return RoomController.instancia;
    }
    //************ CRUD ********************** */
    registerRoom = async (dtroom) => {
        const logicroom = instanceBusinessClass_1.InstanceLogicClass.instanceLRoom(dtroom);
        const result = await logicroom.register();
        return result;
    };
    updateRoom = async (dtroom) => {
        const logicroom = instanceBusinessClass_1.InstanceLogicClass.instanceLRoom(dtroom);
        const result = await logicroom.update();
        return result;
    };
    inactiveRoom = async (dtroom) => {
        const logicroom = instanceBusinessClass_1.InstanceLogicClass.instanceLRoom(dtroom);
        const result = await logicroom.disable();
        return result;
    };
    getRoom = async (numberroom) => {
        const groom = await LGetRoom_1.LGetRoom.getLRoom(numberroom);
        return groom;
    };
    //***************** GET ROOMS ***************** */
    getRooms = async () => {
        const grooms = await LGetRoom_1.LGetRoom.getLRooms();
        return grooms;
    };
    getLActiveSortRooms = async () => {
        const getarooms = await LGetRoom_1.LGetRoom.getLActiveSortRoom();
        return getarooms;
    };
}
exports.RoomController = RoomController;
//# sourceMappingURL=RoomController.js.map