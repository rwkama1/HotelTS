import DTOPayment from "../../shared/entity/DTOPayment";
import { ArrayPayment } from "../class/business_class/array/LArrayPayment";
import LogicPayment from "../class/business_class/LPayment";

import LogicReservation from "../class/business_class/LReservation";

export default interface IPaymentController 
{
    //******************* REGISTER ************************* */
    
    enterPassenger(idcard:string):Promise<LogicReservation[]>;
    enterReservationsService(numberr:number):Promise<DTOPayment>;
    closePayment(passengeramount:number,datepayment:Date):Promise<number>;
    savePayment():Promise<boolean>;

    //*********************** GETS ************************** */

    getLPayment(idpay:number):Promise<LogicPayment>;
    getLPaymentPassenger(idcard:string):Promise<LogicPayment>;
    getListPayments():Promise<ArrayPayment>;
    
}