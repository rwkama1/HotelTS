import DTOPassenger from "../../shared/entity/DTOPassenger";
import { ArrayReservation } from "../class/business_class/array/LArrayReservation";
import LogicReservationDetail from "../class/business_class/LDetailReservation";
import LogicPassenger from "../class/business_class/LPassenger";
import LogicReservation from "../class/business_class/LReservation";

export default interface IReservationController 
{
    getReservation(numberr:number):Promise<LogicReservation>;
    getReservations():Promise<ArrayReservation>;

    //************** HOTEL RESERVATION ************ */

    enterPassenger(idcard:string):Promise<false|LogicPassenger>;
    registerPassenger(dtopassenger:DTOPassenger):Promise<false|LogicPassenger>;
    registerReservationDetail(numberrom:number):Promise<LogicReservationDetail>;
    removeReservationDetail(numberrom:number):Promise<boolean>;
    closeReservation():Promise<LogicReservation>;
    saveReservation(reservationdate:Date,arrivaldate:Date,departuredate:Date):Promise<boolean>;
}