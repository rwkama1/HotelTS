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
    
    // getSort=()=>
    // {
    // let listarrayr=this.arrayreservation;
    // let newarray=[];
    // for(let reservation of listarrayr)
    //   {
    //     if(reservation.statee==="Active")
    //     {
    //       newarray.push(passenger);
         
    //     }
    //   }
    //  const sortarray=newarray.sort((a, b) => a.name.localeCompare(b.name));
    //  return sortarray
    // }
}