import DTORoom from "../../shared/entity/DTORoom";


export default interface IDataRoom 
{
    registerRoom(dtoroom:DTORoom):Promise<boolean>;
    updateRoom(dtoroom:DTORoom):Promise<boolean>;
    changeStateRoom(numberroom:number,state:string):Promise<boolean>;
    getRooms():Promise<DTORoom[]>;
}