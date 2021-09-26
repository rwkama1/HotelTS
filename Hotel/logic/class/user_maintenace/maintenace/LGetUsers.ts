
import { FactoryData } from "../../../../data/FactoryData";
import { ArrayUser } from "../../business_class/array/LArrayUser";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetUsers{

  static getLActiveSortUsers=async()=>
  {
    let datausers= await this.getLUsers();
    let searchu=datausers.getActiveSort();
    return searchu
  }
    static getLUser=async(idcard:string)=>
    {
      let datausers= await this.getLUsers();
     
      let searchuser=datausers.search(idcard);
      return searchuser
    }
    
    static getLUsers=async()=>
    {
    let arrayluser=[];
      let datausers= await FactoryData.getDataUser().getUsers();
      for(var dtouser of datausers)
      {
      const logicuser=InstanceLogicClass.instanceLUser(dtouser);
       arrayluser.push(logicuser);
      }
    let arraylogicusers=new ArrayUser(arrayluser);
    return arraylogicusers; 
    }
   
  
}