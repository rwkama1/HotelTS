import DTODPassengerService from "./DTODPassengerService";

export  default class DTOPassengerService
{
    numberps: number;
    idcardp: string;
    startdate: Date;
    enddate: Date;
    total: number;
    observations: string;
    listdetailps:DTODPassengerService[];

   constructor(pnumberps:number,pidcardp:string,pstartdate:Date,penddate:Date,
    ptotal:number,pobservations:string,plistdetailps:DTODPassengerService[])
   {
       this.numberps=pnumberps;
       this.idcardp=pidcardp;
       this.startdate=pstartdate;
       this.enddate=penddate;
       this.total=ptotal;
       this.observations=pobservations;
       this.listdetailps=plistdetailps;
   }
}