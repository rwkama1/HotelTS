import LogicPassenger from "../LPassenger";

export class ArrayPassenger{
    
    arraypassenger: LogicPassenger[];
    
    constructor(parraypassenger:LogicPassenger[])
       {
        this.arraypassenger=parraypassenger;
       }
     
    search=(idcard:string)=>
    {
    let listpassenger=this.arraypassenger;
    for(let passenger of listpassenger)
      {
        if(idcard===passenger.idcard)
        {
          return passenger;
        }
      }
      return null;
    }
    
    getActiveSort=()=>
    {
    let listpassenger=this.arraypassenger;
    let newarray=[];
    for(let passenger of listpassenger)
      {
        if(passenger.statee==="Active")
        {
          newarray.push(passenger);
         
        }
      }
     const sortarray=newarray.sort((a, b) => a.name.localeCompare(b.name));
     return sortarray
    }
}