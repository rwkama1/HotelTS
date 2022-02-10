
import { FactoryData } from "../../../../data/FactoryData";

import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetUsers{


  static getLUser=async(idcard:string)=>
    {
      let datausers= await FactoryData.getDataUser().getUserbyID(idcard);
      const logicuser=InstanceLogicClass.instanceLUser(datausers);
      return logicuser
    }
    // static getLActiveSortUsers=async()=>
    // {
    //   let arrayluser=[];
    //   let datausers= await FactoryData.getDataUser().getUsersActive();
    //   for(var dtouser of datausers)
    //     {
    //     const logicuser=InstanceLogicClass.instanceLUser(dtouser);
    //      arrayluser.push(logicuser);
    //     }
    //     return arrayluser;
    // }
    // static getLUsers=async()=>
    // {
    // let arrayluser=[];
    //   let datausers= await FactoryData.getDataUser().getUsers();
    //   for(var dtouser of datausers)
    //   {
    //   const logicuser=InstanceLogicClass.instanceLUser(dtouser);
    //    arrayluser.push(logicuser);
    //   }
    //   return arrayluser;
    // // let arraylogicusers=new ArrayUser(arrayluser);
    // // return arraylogicusers; 
    // }
   
  
}