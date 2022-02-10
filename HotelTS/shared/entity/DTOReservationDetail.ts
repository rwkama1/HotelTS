export  default class DTOReservationDetail
{
    numberrd: number;
    value: number;
    numberroom: number;

   constructor(pnumberrd:number,pvalue:number,
    pnumberroom:number)
   {
       this.numberrd=pnumberrd;
       this.value=pvalue;
       this.numberroom=pnumberroom;    
   }
}