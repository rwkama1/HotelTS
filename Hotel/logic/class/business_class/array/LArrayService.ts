import LogicService from "../LService";

export class ArrayService{
    
    arrayservice: LogicService[];
    
    constructor(parrayservice:LogicService[])
       {
        this.arrayservice=parrayservice;
       }
     
    search=(id:number)=>
    {
    let listservice=this.arrayservice;
    for(let service of listservice)
      {
        if(id===service.idservice)
        {
          return service;
        }
      }
      return null;
    }
}