"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
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
    //***************** GET ROOMS ***************** */
    getRoom = async (numberroom) => {
        const groom = await LGetRoom_1.LGetRoom.getLRoom(numberroom);
        if (groom === null) {
            throw new logicexception_1.LogicException("The Room does not exists in the system");
        }
        return groom.getDTO();
    };
    getRooms = async () => {
        const grooms = await LGetRoom_1.LGetRoom.getLRooms();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayRoom(grooms.arrayroom);
        return arraydto;
    };
    getLActiveSortRooms = async () => {
        const getarooms = await LGetRoom_1.LGetRoom.getLActiveSortRoom();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayRoom(getarooms);
        return arraydto;
    };
}
exports.RoomController = RoomController;
//# sourceMappingURL=RoomController.js.map