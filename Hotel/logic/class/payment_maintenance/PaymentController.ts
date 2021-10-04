import IPaymentController from "../../interfaces/IPaymentController";
import LRegisterPayment from "./maintenance/LRegisterPayment";

export class PaymentController implements IPaymentController{

    private static instancia: PaymentController;
    private constructor() { }
    public static getInstance(): PaymentController {
        if (!PaymentController.instancia) {
            PaymentController.instancia = new PaymentController();
        }

        return PaymentController.instancia;
    }
    enterPassenger=async(idcard:string)=>
    {
        let getrs= await LRegisterPayment.getInstance().enterPassenger(idcard);
        return getrs     
    }
    enterReservationsService=async(numberr:number)=>
    {
        let datapay= await LRegisterPayment.getInstance().enterReservationsService(numberr);
        return datapay
    }
    closePayment=async(passengeramount:number,datepayment:Date)=>
    {
        let diff=await LRegisterPayment.getInstance().closePayment(passengeramount,datepayment);
        return diff

    }
    savePayment=async()=>
    {
        let result= await LRegisterPayment.getInstance().savePayment();
        return result

    }
}