
import LogicPassengerService from "../LPassengerService";

export class ArrayPassengerService{
    
    arrayps: LogicPassengerService[];
    
    constructor(parrayps:LogicPassengerService[])
       {
        this.arrayps=parrayps;
       }
     
    search=(idps:number)=>
    {
    let listps=this.arrayps;
    for(let ps of listps)
      {
        if(idps===ps.numberps)
        {
          return ps;
        }
      }
      return null;
    }
    // searchbyPassenger=(idcard:string)=>
    // {
    // let listreservation=this.arrayreservation;
    // let newarray=[];
    // for(let reservation of listreservation)
    //   {
    //     if(idcard===reservation.passenger.idcard)
    //     {
    //       newarray.push(reservation);
         
    //     }
    //   }

    //   return newarray;
    // }
   
}