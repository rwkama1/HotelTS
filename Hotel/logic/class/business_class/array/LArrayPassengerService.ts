
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
    searchbyPassenger=(idcard:string)=>
    {
      let listps=this.arrayps;
   
    for(let ps of listps)
      {
        if(idcard===ps.passenger.idcard)
        {
          return ps
         
        }
      }

      return null;
    }
   
}