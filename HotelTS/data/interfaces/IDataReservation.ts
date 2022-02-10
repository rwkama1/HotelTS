
import DTOReservation from "../../shared/entity/DTOReservation";


export default interface IDataReservation 
{
    getReservations():Promise<DTOReservation[]>; 
    registerReservation(dtreservation:DTOReservation):Promise<boolean>;
    changeStateReservation(dtoreservation:DTOReservation):Promise<boolean>;
    removeDetailReservation(numberr:number,numberroom:number):Promise<boolean>;
    addDetailReservation(dtoreservation:DTOReservation):Promise<boolean>;
    updateTotalReservation(dtoreservation:DTOReservation):Promise<boolean>;
   
}