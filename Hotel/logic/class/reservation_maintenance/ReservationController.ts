import DTOPassenger from "../../../shared/entity/DTOPassenger";
import IReservationController from "../../interfaces/IReservationController";
import LGetReservation from "./maintenance/LGetReservation";
import LRegisterHotelReservation from "./maintenance/LRegisterHotelReservation";

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
   saveReservation=async(reservationdate:Date,arrivaldate:Date,departuredate:Date)=>
   {
    const result=await LRegisterHotelReservation.getInstance().saveReservation(reservationdate,arrivaldate,departuredate);
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

}