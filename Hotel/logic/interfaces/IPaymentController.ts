import DTOPayment from "../../shared/entity/DTOPayment";
import DTOReservation from "../../shared/entity/DTOReservation";


export default interface IPaymentController 
{
    //******************* REGISTER ************************* */
    
    enterPassenger(idcard:string):Promise<DTOReservation[]>;
    enterReservationsService(numberr:number):Promise<DTOPayment>;
    closePayment(passengeramount:number,datepayment:Date):Promise<number>;
    savePayment():Promise<boolean>;

    //*********************** GETS ************************** */

    getLPayment(idpay:number):Promise<DTOPayment>;
    getLPaymentPassenger(idcard:string):Promise<DTOPayment>;
    getListPayments():Promise<DTOPayment[]>;
    
}