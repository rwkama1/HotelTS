
import DTOPassengerService from "../../shared/entity/DTOPassengerService";


export default interface IDataPassengerService 
{
    registerPassengerService(dtopservice:DTOPassengerService):Promise<boolean>; 
    listPassengersServices():Promise<DTOPassengerService[]>;
}