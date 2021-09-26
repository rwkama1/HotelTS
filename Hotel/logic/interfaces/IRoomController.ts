import DTORoom from "../../shared/entity/DTORoom";
import { ArrayRoom } from "../class/business_class/array/LArrayRoom";
import LogicRoom from "../class/business_class/LRoom";

export default interface IRoomController 
{
    getRoom(numberroom:number):Promise<LogicRoom>;
    getRooms():Promise<ArrayRoom>;
    getLActiveSortRooms():Promise<LogicRoom[]>;
   
    registerRoom(dtroom:DTORoom):Promise<boolean>;
    updateRoom(dtroom:DTORoom):Promise<boolean>;
    inactiveRoom(dtroom:DTORoom):Promise<boolean>;
 
    
}