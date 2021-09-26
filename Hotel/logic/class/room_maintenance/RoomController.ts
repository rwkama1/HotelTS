import DTORoom from "../../../shared/entity/DTORoom";
import IRoomController from "../../interfaces/IRoomController";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LGetRoom } from "./maintenance/LGetRoom";

export class RoomController implements IRoomController{

    private static instancia: RoomController;
    private constructor() { }
    public static getInstance(): RoomController {
        if (!RoomController.instancia) {
            RoomController.instancia = new RoomController();
        }

        return RoomController.instancia;
    }
    
    //************ CRUD ********************** */
    registerRoom=async(dtroom:DTORoom)=>
   {   
     const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
        const result=await logicroom.register();
        return result 
       
   }
    updateRoom=async(dtroom:DTORoom)=>
   {
    const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
    const result=await logicroom.update();
    return result
   }

    inactiveRoom=async(dtroom:DTORoom)=>
   {
    const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
    const result=await logicroom.disable();
    return result
   }
   getRoom=async(numberroom:number)=>
   {
    const groom=await LGetRoom.getLRoom(numberroom);
    return groom
   }
   //***************** GET ROOMS ***************** */
   getRooms=async()=>
   {
        const grooms=await LGetRoom.getLRooms();
        return grooms
    
   }
   getLActiveSortRooms=async()=>
   {
        const getarooms=await LGetRoom.getLActiveSortRoom();
        return getarooms
    
   }
}