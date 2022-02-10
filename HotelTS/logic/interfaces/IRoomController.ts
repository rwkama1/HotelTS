import DTORoom from "../../shared/entity/DTORoom";


export default interface IRoomController 
{

   //#region CUD

   registerRoom(dtroom:DTORoom):Promise<boolean>;
   updateRoom(dtroom:DTORoom):Promise<boolean>;
   inactiveRoom(dtroom:DTORoom):Promise<boolean>;

   //#endregion
   
   
 
  //#region SEARCH

  getRoombyID(number)
  getRoomSearch(number1,number2,type,typebed,value1,value2)
  
//#endregion
  //#region LISTS
    getRooms()
  
     
     getRoomsActive()    
     
     getRoomsInactive()
     
     SortbyNumberRoomDesc()
     SortbyTypeAsc()
    
     SortbyTypeDesc()
     SortbyTypeBedAsc()
  
     SortbyTypeBedDesc()
    
     SortbyValueAsc()
     SortbyValueDesc()
    
//#endregion
}  
