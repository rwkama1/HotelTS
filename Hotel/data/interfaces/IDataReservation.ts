import { IRecordSet, IResult } from "mssql";
import DTOReservation from "../../shared/entity/DTOReservation";
import DTOReservationDetail from "../../shared/entity/DTOReservationDetail";

export default interface IDataReservation 
{
    getReservations():Promise<DTOReservation[]>; 
    registerReservation(dtreservation:DTOReservation):Promise<boolean>;
   
   
}