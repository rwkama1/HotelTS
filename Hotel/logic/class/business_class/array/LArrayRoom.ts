import LogicRoom from "../LRoom";

export class ArrayRoom{
    
    arrayroom: LogicRoom[];
    
    constructor(parrayroom:LogicRoom[])
       {
        this.arrayroom=parrayroom;
       }
     
    search=(number:number)=>
    {
    let listroom=this.arrayroom;
    for(let room of listroom)
      {
        if(number===room.numberroom)
        {
          return room;
        }
      }
      return null;
    }
    
    getActiveSort=()=>
    {
    let listroom=this.arrayroom;
    let newarray=[];
    for(let room of listroom)
      {
        if(room.statee==="Active")
        {
          newarray.push(room);
         
        }
      }
     const sortarray=newarray.sort();
     return sortarray
    }
}