import DTORoom from "../../shared/entity/DTORoom";


export default interface IRoomController 
{
    //************** GETS ***************** */

    getRoom(numberroom:number):Promise<DTORoom>;
    getRooms():Promise<DTORoom[]>;
    getLActiveSortRooms():Promise<DTORoom[]>;

   //**************** MAINTENACE **************** */
   
    registerRoom(dtroom:DTORoom):Promise<boolean>;
    updateRoom(dtroom:DTORoom):Promise<boolean>;
    inactiveRoom(dtroom:DTORoom):Promise<boolean>;
 
    
}