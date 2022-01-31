import { FactoryData } from "../../../data/FactoryData";
import DTORoom from "../../../shared/entity/DTORoom";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IRoomController from "../../interfaces/IRoomController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LCUDRoom } from "./maintenance/LCUDRoom";
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
    
   //#region CUD
   registerRoom=async(dtroom:DTORoom)=>
   {   
    return LCUDRoom.registerRoom(dtroom);
       
   }
    updateRoom=async(dtroom:DTORoom)=>
   {
    return LCUDRoom.updateRoom(dtroom);
   }

    inactiveRoom=async(dtroom:DTORoom)=>
   {
    return LCUDRoom.InactiveRoom(dtroom);
   }
   //#endregion
  //#region SEARCH
  getRoombyID=async(number)=>
  {
    return FactoryData.getDataRoom().getRoombyID(number);
  }
  getRoomSearch=async(number1,number2,type,typebed,value1,value2)=>
  { 
    return FactoryData.getDataRoom().getRoomSearch(number1,number2,type,typebed,value1,value2);
  }
//#endregion
  //#region LISTS
    getRooms=async()=>
    {
        return FactoryData.getDataRoom().getRooms();
    }   
     getRoomsActive=async()=>
     {
        return FactoryData.getDataRoom().getRoomsActive();
    } 
     getRoomsInactive=async()=>
     {
        return FactoryData.getDataRoom().getRoomsInactive();
    }
     SortbyNumberRoomDesc=async()=>
     {
        return FactoryData.getDataRoom().SortbyNumberRoomDesc();
     }
     SortbyTypeAsc=async()=>
     {
        return FactoryData.getDataRoom().SortbyTypeAsc();
     }
     SortbyTypeDesc=async()=>
     {
        return FactoryData.getDataRoom().SortbyTypeDesc();
     }
     SortbyTypeBedAsc=async()=>
     {
        return FactoryData.getDataRoom().SortbyTypeBedAsc();
     }
     SortbyTypeBedDesc=async()=>
     {
        return FactoryData.getDataRoom().SortbyTypeBedDesc();
     }
     SortbyValueAsc=async()=>
     {
        return FactoryData.getDataRoom().SortbyValueAsc();
     }
     SortbyValueDesc=async()=>
     {
        return FactoryData.getDataRoom().SortbyValueDesc();
     }
    
//#endregion
   

 
}