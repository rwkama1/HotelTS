import { LGetRoom } from "../../room_maintenance/maintenance/LGetRoom";
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
    getbyDates=(date1:Date,date2:Date)=>
    {
    let listreservation=this.arrayreservation;
    let newarray=[];
    for(let reservation of listreservation)
      {
        if(date1<=reservation.reservationdate&&reservation.reservationdate<=date2)
        {
          newarray.push(reservation);
         
        }
      }

      return newarray;
    }
    getByRoom=(numberrom:number)=>
    {
    let listreservation=this.arrayreservation;
    let array=[];
    for(let reservation of listreservation)
      {
        for(let detailr of reservation.listDetailReservation)
        {
          if(numberrom===detailr.lroom.numberroom)
          {
            array.push(reservation);
          }
        }
      }
      return array
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