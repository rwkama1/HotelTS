import { FactoryData } from "../../../../data/FactoryData";
import { ArrayReservation } from "../../business_class/array/LArrayReservation";

import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export default class LGetReservation
 {
    static getLReservations=async()=>
    {
      let arrayr=[];
      let datar= await FactoryData.getDataReservation().getReservations();
      for(var reservation of datar)
      {
        const logicr=await InstanceLogicClass.instanceLReservation(reservation);
        arrayr.push(logicr);
      }
    let arraylogicreservation=new ArrayReservation(arrayr);
    return arraylogicreservation; 
    }
    static getLReservation=async(numberr:number)=>
    {
      let datar= await this.getLReservations();
     
      let searchr=datar.search(numberr);
      return searchr
    }
 }