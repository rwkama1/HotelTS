import { FactoryData } from "../../../../data/FactoryData";
import { ArrayPassengerService } from "../../business_class/array/LArrayPassengerService";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export default class LGetPassengerService
{
   static getListPS=async()=>
   {
     let arrayps=[];
     let dataps= await FactoryData.getDataPassengerService().listPassengersServices();
     for(let ps of dataps)
     {
       const logicps=await InstanceLogicClass.instanceLPS(ps);
       arrayps.push(logicps);
     }
   let arraylogicps=new ArrayPassengerService(arrayps);
   return arraylogicps; 
   }
   static getPS=async(id:number)=>
   {
     let dataps= await this.getListPS();
    
     let searchps=dataps.search(id);
     return searchps
   }
   static getPSbyPassenger=async(idcard:string)=>
   {
     
    let dataps= await this.getListPS();
    
     let searchr=dataps.searchbyPassenger(idcard);
     return searchr
   }
  
 
}