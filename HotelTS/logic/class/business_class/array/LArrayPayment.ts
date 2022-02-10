import LogicPayment from "../LPayment";

export class ArrayPayment{
    
    arraypayment: LogicPayment[];
    
    constructor(parraypayment:LogicPayment[])
       {
        this.arraypayment=parraypayment;
       }
     
    search=(idpa:number)=>
    {
    let listpay=this.arraypayment;
    for(let pa of listpay)
      {
        if(idpa===pa.idpayment)
        {
          return pa;
        }
      }
      return null;
    }
    searchbyPassenger=(idcard:string)=>
    {
        let listpay=this.arraypayment;
   
        for(let pa of listpay)
      {
        if(idcard===pa.passenger.idcard)
        {
          return pa
         
        }
      }

      return null;
    }
   
}