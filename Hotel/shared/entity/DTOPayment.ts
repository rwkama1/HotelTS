export  default class DTOPayment
{
    idpayment: number;
    numberreservation: number;
    idpassengerservice: number;
    passengeramount: number;
    totalrs: number;
    date: Date;
    idcardpassenger: string;
   
    
      
   constructor(pidpayment:number,pidcardpassenger:string,pnumberreservation:number,
    pidpassengerservice:number,ppassengeramount:number,ptotalrs:number,pdate:Date)
   {
       this.idpayment=pidpayment;
       this.idcardpassenger=pidcardpassenger;
       this.numberreservation=pnumberreservation;
       this.idpassengerservice=pidpassengerservice;
       this.passengeramount=ppassengeramount;
       this.totalrs=ptotalrs;
       this.date=pdate;
     
   }
}
