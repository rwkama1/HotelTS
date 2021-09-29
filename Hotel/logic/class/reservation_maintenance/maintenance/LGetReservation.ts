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
    static getLReservationPassenger=async(idcard:string)=>
    {
      let datar= await this.getLReservations();
     
      let searchr=datar.searchbyPassenger(idcard);
      return searchr
    }
    static getLPending=async()=>
    {
      let datar= await this.getLReservations();
     
      let getp=datar.getPending();
      return getp
    }
    static getLPendingPassenger=async(idcard:string)=>
    {
      let datar= await this.getLReservations();
     
      let getp=datar.getPendingbyPassenger(idcard);
      return getp
    }
    static getLConfirmed=async()=>
    {
      let datar= await this.getLReservations();
     
      let getp=datar.getConfirmed();
      return getp
    }
    static getLCanceled=async()=>
    {
      let datar= await this.getLReservations();
     
      let getp=datar.getCanceled();
      return getp
    }
 }