import LogicPassenger from "../LPassenger";
import LogicReservation from "../LReservation";

export class ArrayReservation{
    
    arrayreservation: LogicReservation[];
    
    constructor(parrayreservation:LogicReservation[])
       {
        this.arrayreservation=parrayreservation;
       }
     
    search=(numberreservation:number)=>
    {
    let listreservation=this.arrayreservation;
    for(let reservation of listreservation)
      {
        if(numberreservation===reservation.numberreservation)
        {
          return reservation;
        }
      }
      return null;
    }
    searchbyPassenger=(idcard:string)=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(idcard===reservation.passenger.idcard)
        {
          newarray.push(reservation);
         
        }
      }

      return newarray;
    }
    getPendingbyPassenger=(idcard:string)=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(idcard===reservation.passenger.idcard&&reservation.processtatus==="Pending")
        {
          newarray.push(reservation);
         
        }
      }

      return newarray;
    }
    getPending=()=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(reservation.processtatus==="Pending")
        {
          newarray.push(reservation);
        }
      }
      return newarray;
    }
       
    getConfirmed=()=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(reservation.processtatus==="Confirmed")
        {
          newarray.push(reservation);
        }
      }
      return newarray;
    }
    getCanceled=()=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(reservation.processtatus==="Canceled")
        {
          newarray.push(reservation);
        }
      }
      return newarray;
    }
    
}