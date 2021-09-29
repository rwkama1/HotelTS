import { FactoryData } from "../../../../data/FactoryData"
import DTOReservation from "../../../../shared/entity/DTOReservation"

import { LogicException } from "../../../../shared/exceptions/logicexception";
import { LCUDRoom } from "../../room_maintenance/maintenance/LCUDRoom";
import LGetReservation from "./LGetReservation";

export default class LMaintenanceRservation
 {
    static cancelReservation=async(numberreservation:number)=>
    {
      let getreservation=await LGetReservation.getLReservation(numberreservation);
      if(getreservation===null)
      {
         throw new LogicException("The Reservation does not exists in the system");
         
      }
      let datar=await getreservation.cancel();
      let canceledr=await FactoryData.getDataReservation().changeStateReservation(datar);
      return canceledr
    }
    static removeReservationRoom=async(numberreservation:number,numberrom:number)=>
    {
       let getreservation=await LGetReservation.getLReservation(numberreservation);
       if(getreservation===null)
       {
          throw new LogicException("The Reservation does not exists in the system");
          
       }

        let datar=await getreservation.removeReservationDetail(numberrom);
         let remover=await FactoryData.getDataReservation().removeDetailReservation(datar.numberreservation,numberrom);
         return remover
       
       
    }
    static confirmReservation=async(numberreservation:number)=>
    {
      let getreservation=await LGetReservation.getLReservation(numberreservation);
      if(getreservation===null)
      {
         throw new LogicException("The Reservation does not exists in the system");
         
      }
      let datar=await getreservation.confirm();
      for(let detailr of datar.listDetailReservation)
            {
               
                let disableroom=await LCUDRoom.changeStateRoom(detailr.numberroom,'Inactive');
            }
      let confirmr=await FactoryData.getDataReservation().changeStateReservation(datar);
      return confirmr
    }
    static addReservationDetail=async(dtoreservation:DTOReservation)=>
    {
      
      let getreservation=await LGetReservation.getLReservation(dtoreservation.numberreservation);
      if(getreservation===null)
      {
         throw new LogicException("The Reservation does not exists in the system");
         
      }
      let datareservation=await getreservation.addDetailReservation(dtoreservation);
      for(let detailr of dtoreservation.listDetailReservation)
            {
               
                let disableroom=await LCUDRoom.changeStateRoom(detailr.numberroom,'Inactive');
            }
      let addrd=await FactoryData.getDataReservation().addDetailReservation(datareservation);
      return addrd
    }
 };
