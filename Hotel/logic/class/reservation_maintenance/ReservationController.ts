import DTOPassenger from "../../../shared/entity/DTOPassenger";
import DTOReservation from "../../../shared/entity/DTOReservation";
import IReservationController from "../../interfaces/IReservationController";
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
    return ldetailr   
   }
   removeReservationDetail=async(numberrom:number)=> 
   {
    const result=await LRegisterHotelReservation.getInstance().removeReservationDetail(numberrom);
    return result 
   }
   closeReservation=async()=>
   {
    const lreservation=await LRegisterHotelReservation.getInstance().closeReservation();
    return lreservation
   }
   saveReservation=async(dtoreservation:DTOReservation)=>
   {
    const result=await LRegisterHotelReservation.getInstance().saveReservation(dtoreservation);
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
     addReservationDetail=async(dtoreservation:DTOReservation)=>
    {
      let addrd=await LMaintenanceRservation.addReservationDetail(dtoreservation);
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
   return ldetailr   
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
  closeOnlineReservation=async()=>
  {
    const lreservation=await LRegisterOnlineReservation.getInstance().closeReservation();
    return lreservation
  }
  saveOnlineReservation=async(dtoreservation:DTOReservation)=>
  {
   const result=await LRegisterOnlineReservation.getInstance().saveReservation(dtoreservation);
   return result
  }

//    //***************** GET RESERVATION ***************** */

   getReservation=async(numberr:number)=>
   {
        const greservation=await LGetReservation.getLReservation(numberr);
        return greservation
    
   }
   getReservations=async()=>
   {
        const greservations=await LGetReservation.getLReservations();
        return greservations
    
   }
   getLConfirmed=async()=>
   {
        const greservations=await LGetReservation.getLConfirmed();
        return greservations
    
   }
   getLPending=async()=>
   {
        const greservations=await LGetReservation.getLPending();
        return greservations
    
   }
   getLCanceled=async()=>
   {
        const greservations=await LGetReservation.getLCanceled();
        return greservations
    
   }
   getLReservationPassenger=async(idcard:string)=>
   {
    const greservations=await LGetReservation.getLReservationPassenger(idcard);
    return greservations
   }
    getLPendingPassenger=async(idcard:string)=>
   {
    const greservations=await LGetReservation.getLPendingPassenger(idcard);
    return greservations
   }
   getLRbyDate=async(date1:Date,date2:Date)=>
   {
    const greservations=await LGetReservation.getReservationbydates(date1,date2);
    return greservations
   }
   getByRoom=async(nr:number)=>
   {
    const greservations=await LGetReservation.getLByRoom(nr);
    return greservations
   }

}