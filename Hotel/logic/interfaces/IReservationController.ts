import DTOPassenger from "../../shared/entity/DTOPassenger";
import DTOReservation from "../../shared/entity/DTOReservation";
import { ArrayReservation } from "../class/business_class/array/LArrayReservation";
import LogicReservationDetail from "../class/business_class/LDetailReservation";
import LogicPassenger from "../class/business_class/LPassenger";
import LogicReservation from "../class/business_class/LReservation";

export default interface IReservationController 
{
    //*********************GETS *********************** */
    getReservation(numberr:number):Promise<LogicReservation>;
    getReservations():Promise<ArrayReservation>;

    //************** HOTEL RESERVATION ************ */

    enterPassenger(idcard:string):Promise<false|LogicPassenger>;
    registerPassenger(dtopassenger:DTOPassenger):Promise<false|LogicPassenger>;
    registerReservationDetail(numberrom:number):Promise<LogicReservationDetail>;
    removeReservationDetail(numberrom:number):Promise<boolean>;
    closeReservation():Promise<LogicReservation>;
    saveReservation(dtoreservation:DTOReservation):Promise<boolean>;


    //************************ ONLINE RESERVATION ******************* */

    startReservation():Promise<LogicReservation>;
    registerOnlineReservationDetail(numberrom:number):Promise<LogicReservationDetail>;
    getReservationinProgress():LogicReservation;
    removeOnlineReservationDetail(numberrom:number):Promise<boolean>;
    closeOnlineReservation():Promise<LogicReservation>;
    saveOnlineReservation(dtoreservation:DTOReservation):Promise<boolean>;
}