import DTOPassenger from "../../../shared/entity/DTOPassenger";
import DTOReservation from "../../../shared/entity/DTOReservation";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IReservationController from "../../interfaces/IReservationController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import LGetReservation from "./maintenance/LGetReservation";
import LMaintenanceRservation from "./maintenance/LMaintenanceReservation";
import LRegisterHotelReservation from "./maintenance/LRegisterHotelReservation";
import LRegisterOnlineReservation from "./maintenance/LRegisterOnlineReservation";

export class ReservationController implements IReservationController{

    private static instancia: ReservationController;
    private constructor() { }
    public static getInstance(): ReservationController {
        if (!ReservationController.instancia) {
            ReservationController.instancia = new ReservationController();
        }

        return ReservationController.instancia;
    }
    
//     //**************** HOTEL RESERVATION ********************** **/

   enterPassenger=async(idcard:string)=>
   {   
     const enterp=await LRegisterHotelReservation.getInstance().enterPassenger(idcard);
     return enterp 
       
   }
   registerPassenger=async(dtopassenger:DTOPassenger)=>
   {
     const result=await LRegisterHotelReservation.getInstance().registerPassenger(dtopassenger);
    return result  
   }
   registerReservationDetail=async(numberrom:number)=>
   {
    const ldetailr=await LRegisterHotelReservation.getInstance().registerReservationDetail(numberrom);
    return ldetailr.getDTO()
   }
   removeReservationDetail=async(numberrom:number)=> 
   {
    const result=await LRegisterHotelReservation.getInstance().removeReservationDetail(numberrom);
    return result 
   }
   closeReservation=async(dtoreservation:DTOReservation)=>
   {
    const lreservation=await LRegisterHotelReservation.getInstance().closeReservation(dtoreservation);
    return lreservation
   }
   saveReservation=async()=>
   {
    const result=await LRegisterHotelReservation.getInstance().saveReservation();
    return result
   }
//************************** MAINTENANCE ******************************** */

  removeReservationRoom=async(numberreservation:number,numberrom:number)=>
  {
    let removerroom=await LMaintenanceRservation.removeReservationRoom(numberreservation,numberrom);
    return removerroom
  }   
    cancelReservation=async(numberreservation:number)=>
    {
      let cancelr=await LMaintenanceRservation.cancelReservation(numberreservation);
      return cancelr
    }
    confirmReservation=async(numberreservation:number)=>
    {
      let confirm=await LMaintenanceRservation.confirmReservation(numberreservation);
      return confirm
    }
    addReservationDetail=async(room:number,numberreservation:number)=>
    {
      let addrd=await LMaintenanceRservation.addReservationDetail(room,numberreservation);
      return addrd
    }
  
 
//     //**************** ONLINE RESERVATION ********************** **/

  startReservation=async()=>
  {
    const startr=await LRegisterOnlineReservation.getInstance().startReservation();
     return startr 
  }
  registerOnlineReservationDetail=async(numberrom:number)=>
  {
   const ldetailr=await LRegisterOnlineReservation.getInstance().registerReservationDetail(numberrom);
   return ldetailr.getDTO()
  }
  getReservationinProgress=()=>
  {
   const getr= LRegisterOnlineReservation.getInstance().objreservation;
   return getr
  }
  removeOnlineReservationDetail=async(numberrom:number)=> 
  {
   const result=await LRegisterOnlineReservation.getInstance().removeReservationDetail(numberrom);
   return result 
  }
  closeOnlineReservation=async(dtoreservation:DTOReservation)=>
  {
    const lreservation=await LRegisterOnlineReservation.getInstance().closeReservation(dtoreservation);
    return lreservation
  }
  saveOnlineReservation=async()=>
  {
   const result=await LRegisterOnlineReservation.getInstance().saveReservation();
   return result
  }

//    //***************** GET RESERVATION ***************** */

   getReservation=async(numberr:number)=>
   {
        const greservation=await LGetReservation.getLReservation(numberr);
        if(greservation===null)
        {
            throw new LogicException("The Reservation does not exists in the system");
            
        }
        return greservation.getDTO()
    
   }
   getReservations=async()=>
   {
        const greservations=await LGetReservation.getLReservations();
          let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations.arrayreservation);
        return arraydto
        
    
   }
   getLConfirmed=async()=>
   {
        const greservations=await LGetReservation.getLConfirmed();
        let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
        return arraydto
    
   }
   getLPending=async()=>
   {
        const greservations=await LGetReservation.getLPending();
        let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
        return arraydto
    
   }
   getLCanceled=async()=>
   {
        const greservations=await LGetReservation.getLCanceled();
        let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
        return arraydto
    
   }
   getLReservationPassenger=async(idcard:string)=>
   {
    const greservations=await LGetReservation.getLReservationPassenger(idcard);
    let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
      return arraydto
   }
    getLPendingPassenger=async(idcard:string)=>
   {
    const greservations=await LGetReservation.getLPendingPassenger(idcard);
    let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
    return arraydto
   }
   getLRbyDate=async(date1:Date,date2:Date)=>
   {
    const greservations=await LGetReservation.getReservationbydates(date1,date2);
    let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
    return arraydto
   }
   getByRoom=async(nr:number)=>
   {
    const greservations=await LGetReservation.getLByRoom(nr);
    let arraydto=InstanceArrayDTO.instanceArrayReservation(greservations);
    return arraydto
   }

}