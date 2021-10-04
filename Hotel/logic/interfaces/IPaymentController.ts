import DTOPayment from "../../shared/entity/DTOPayment";

import LogicReservation from "../class/business_class/LReservation";

export default interface IPaymentController 
{
    enterPassenger(idcard:string):Promise<LogicReservation[]>;
    enterReservationsService(numberr:number):Promise<DTOPayment>;
    closePayment(passengeramount:number,datepayment:Date):Promise<number>;
    savePayment():Promise<boolean>;
}