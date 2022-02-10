import { LogicException } from "../../../shared/exceptions/logicexception";
import IPaymentController from "../../interfaces/IPaymentController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
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
        let arraydto=InstanceArrayDTO.instanceArrayReservation(getrs);
        return arraydto
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
        if(datapay===null)
        {
            throw new LogicException("The Payment does not exists in the system");
            
        }
        return datapay.getDTO()
      }

      getLPaymentPassenger=async(idcard:string)=>
      {
        let datapay= await LGetPayment.getLPaymentPassenger(idcard);
        if(datapay===null)
        {
            throw new LogicException("The Payment does not exists in the system");
            
        }
        return datapay.getDTO()
      }
      getListPayments=async()=>
      {
        let datapay= await LGetPayment.getListPayments();
        let arraydto=InstanceArrayDTO.instanceArrayPayment(datapay.arraypayment);
        return arraydto
        
      }

}