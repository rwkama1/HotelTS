
import { FactoryData } from "../../../../data/FactoryData";
import LogicPayment from "../../business_class/LPayment";
import LGetReservation from "../../reservation_maintenance/maintenance/LGetReservation";


export default class LRegisterPayment
 {
    private static instancia: LRegisterPayment;
    private constructor() { }
    public static getInstance(): LRegisterPayment {
        if (!LRegisterPayment.instancia) {
            LRegisterPayment.instancia = new LRegisterPayment();
        }

        return LRegisterPayment.instancia;
    }
    private _objpayment: LogicPayment;
    public get objpayment(): LogicPayment {
        return this._objpayment;
    }
    public set objpayment(value: LogicPayment) {
        this._objpayment = value;
    }
    enterPassenger=async(idcard:string)=>
    {
     
        let newlogicpay=new LogicPayment(0,null,null,null,10,5,new Date());
        this.objpayment=newlogicpay;
        let getreservationp= await this.objpayment.enterPassenger(idcard);
        return getreservationp     
    }
    enterReservationsService=async(numberr:number)=>
    {
        let datar=await this.objpayment.enterReservationsService(numberr);
        return datar

    }
    closePayment=async(passengeramount:number,datepayment:Date)=>
    {
        let diff=await this.objpayment.close(passengeramount,datepayment);
        return diff

    }
    savePayment=async()=>
    {
        let datap=this.objpayment.getDTO();
        let savepay=await FactoryData.getDataPayment().registerPayment(datap);
        return savepay

    }
  }