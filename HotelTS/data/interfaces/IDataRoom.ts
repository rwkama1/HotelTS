import DTORoom from "../../shared/entity/DTORoom";


export default interface IDataRoom 
{
    //#region CUD
    registerRoom(dtoroom:DTORoom):Promise<boolean>;
    updateRoom(dtoroom:DTORoom):Promise<boolean>;
    changeStateRoom(numberroom:number,state:string):Promise<boolean>;
    //#endregion
   //#region SEARCH
   getRoombyID(number);
   getRoomSearch(number1,number2,type,typebed,value1,value2);
   //#endregion
   //#region LISTS
    getRooms():Promise<DTORoom[]>;
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