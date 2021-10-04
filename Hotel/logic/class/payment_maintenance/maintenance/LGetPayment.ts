import { FactoryData } from "../../../../data/FactoryData";
import { ArrayPayment } from "../../business_class/array/LArrayPayment";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetPayment{

    
      static getLPayment=async(idpay:number)=>
      {
        let datapay= await this.getListPayments();
        let searchpay=datapay.search(idpay);
        return searchpay
      }
      static getLPaymentPassenger=async(idcard:string)=>
      {
        let datapay= await this.getListPayments();
        let searchpay=datapay.searchbyPassenger(idcard);
        return searchpay
      }
      static getListPayments=async()=>
      {
      let arrayp=[];
       let datap= await FactoryData.getDataPayment().getPayments();
       for(var dtop of datap)
        {
        const logicpayment=await InstanceLogicClass.instancePayment(dtop);
        arrayp.push(logicpayment);
        }
      let arraylogicpayment=new ArrayPayment(arrayp);
      return arraylogicpayment; 
      }
     
    
  }