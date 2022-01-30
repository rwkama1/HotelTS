import DTORoom from "../../../shared/entity/DTORoom";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IRoomController from "../../interfaces/IRoomController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
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

   //***************** GET ROOMS ***************** */

   getRoom=async(numberroom:number)=>
   {
    const groom=await LGetRoom.getLRoom(numberroom);
    if(groom===null)
    {
        throw new LogicException("The Room does not exists in the system");
        
    }
    return groom.getDTO()
   }

   getRooms=async()=>
   {
        const grooms=await LGetRoom.getLRooms();
        let arraydto=InstanceArrayDTO.instanceArrayRoom(grooms.arrayroom);
        return arraydto
       
    
   }
   getLActiveSortRooms=async()=>
   {
        const getarooms=await LGetRoom.getLActiveSortRoom();
        let arraydto=InstanceArrayDTO.instanceArrayRoom(getarooms);
        return arraydto
    
   }
}