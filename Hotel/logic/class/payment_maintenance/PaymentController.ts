import IPaymentController from "../../interfaces/IPaymentController";
import { LGetPayment } from "./maintenance/LGetPayment";
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

    //***************************** GETS ************************************** */

     getLPayment=async(idpay:number)=>
      {
        let datapay= await LGetPayment.getLPayment(idpay);
        return datapay
      }

      getLPaymentPassenger=async(idcard:string)=>
      {
        let datapay= await LGetPayment.getLPaymentPassenger(idcard);
        return datapay
      }
      getListPayments=async()=>
      {
        let datapay= await LGetPayment.getListPayments();
        return datapay
      }

}