import DTOReservationDetail from "./DTOReservationDetail";

export  default class DTOReservation
{
    numberreservation: number;
    reservationdate: Date;
    arrivaldate: Date;
    departuredate: Date;
    processtatus: string;
    confirmationstatus: string;
    origin: string;
    total: number;
    idcardpassenger: string;
    listDetailReservation:DTOReservationDetail[];

     
   constructor(pnumberreservation:number,preservationdate:Date,
    parrivaldate:Date,pdeparturedate:Date,pprocesstatus:string,
    pconfirmationstatus:string,porigin:string,ptotal:number,
    pidcardpassenger:string,plistDetailReservation:DTOReservationDetail[] )
   {
       this.numberreservation=pnumberreservation;
       this.reservationdate=preservationdate;
       this.arrivaldate=parrivaldate;
       this.departuredate=pdeparturedate;
       this.processtatus=pprocesstatus;
       this.confirmationstatus=pconfirmationstatus;
       this.origin=porigin;
       this.total=ptotal;
       this.idcardpassenger=pidcardpassenger;
       this.listDetailReservation=plistDetailReservation;
   }
}