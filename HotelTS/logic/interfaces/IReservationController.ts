import DTOPassenger from "../../shared/entity/DTOPassenger";
import DTOReservation from "../../shared/entity/DTOReservation";
import DTOReservationDetail from "../../shared/entity/DTOReservationDetail";
import { ArrayReservation } from "../class/business_class/array/LArrayReservation";
import LogicReservationDetail from "../class/business_class/LDetailReservation";
import LogicPassenger from "../class/business_class/LPassenger";
import LogicReservation from "../class/business_class/LReservation";

export default interface IReservationController 
{
    //********************* GETS *********************** */

    getReservation(numberr:number):Promise<DTOReservation>;
    getLConfirmed():Promise<DTOReservation[]>;
    getLPending():Promise<DTOReservation[]>;
    getLCanceled():Promise<DTOReservation[]>;
    getReservations():Promise<DTOReservation[]>;
    getLReservationPassenger(idcard:string):Promise<DTOReservation[]>;
    getLPendingPassenger(idcard:string):Promise<DTOReservation[]>;
    getLRbyDate(date1:Date,date2:Date):Promise<DTOReservation[]>;
    getByRoom(nr:number):Promise<DTOReservation[]>;

    //************** HOTEL RESERVATION ************ */

    enterPassenger(idcard:string):Promise<false|LogicPassenger>;
    registerPassenger(dtopassenger:DTOPassenger):Promise<false|LogicPassenger>;
    registerReservationDetail(numberrom:number):Promise<DTOReservationDetail>;
    removeReservationDetail(numberrom:number):Promise<boolean>;
    closeReservation(dtoreservation:DTOReservation):Promise<DTOReservation>;
    saveReservation():Promise<boolean>;


    //************************ ONLINE RESERVATION ******************* */

    startReservation():Promise<LogicReservation>;
    registerOnlineReservationDetail(numberrom:number):Promise<DTOReservationDetail>;
    getReservationinProgress():LogicReservation;
    removeOnlineReservationDetail(numberrom:number):Promise<boolean>;
    closeOnlineReservation(dtoreservation:DTOReservation):Promise<DTOReservation>;
    saveOnlineReservation():Promise<boolean>;

    //************************** MAINTENANCE ******************************** */

    removeReservationRoom(numberreservation:number,numberrom:number):Promise<boolean>;
    cancelReservation(numberreservation:number):Promise<boolean>;
    confirmReservation(numberreservation:number):Promise<boolean>;
    addReservationDetail(room:number,numberreservation:number):Promise<boolean>;

}