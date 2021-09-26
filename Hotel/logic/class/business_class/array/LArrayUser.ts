import LogicUser from "../LUser";

export class ArrayUser{
    
    arrayuser: LogicUser[];
    
    constructor(parrayuser:LogicUser[])
       {
        this.arrayuser=parrayuser;
       }
     
    search=(idcard:string)=>
    {
    let listuser=this.arrayuser
    for(let user of listuser)
      {
        if(idcard===user.idcard)
        {
          return user;
        }
      }
      return null;
    }
    getActiveSort=()=>
    {
      let listuser=this.arrayuser
    let newarray=[];
    for(let user of listuser)
      {
        if(user.statee==="Active")
        {
          newarray.push(user);
         
        }
      }
     const sortarray=newarray.sort((a, b) => a.name.localeCompare(b.name));
     return sortarray
    }
}