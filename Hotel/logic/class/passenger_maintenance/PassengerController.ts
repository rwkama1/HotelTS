import DTOPassenger from "../../../shared/entity/DTOPassenger";
import IPassengerController from "../../interfaces/IPassengerController";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LGetPassenger } from "./maintenace/LGetPassenger";
import { LPassengerAutentication } from "./maintenace/LPassengerAutentication";

export class PassengerController implements IPassengerController{

    private static instancia: PassengerController;
    private constructor() { }
    public static getInstance(): PassengerController {
        if (!PassengerController.instancia) {
            PassengerController.instancia = new PassengerController();
        }

        return PassengerController.instancia;
    }
    
    //************ CRUD ********************** */
    registerPassenger=async(dtpassenger:DTOPassenger)=>
   {   
     const logicp=InstanceLogicClass.instanceLPassenger(dtpassenger);
        const result=await logicp.register();
        return result 
       
   }
    updatePassanger=async(dtpassenger:DTOPassenger)=>
   {
    const logicp=InstanceLogicClass.instanceLPassenger(dtpassenger);
    const result=await logicp.update();
    return result
   }

    inactivatePassanger=async(dtpassenger:DTOPassenger)=>
   {
    const logip=InstanceLogicClass.instanceLPassenger(dtpassenger);
    const result=await logip.disable();
    return result
   }
    getPassanger=async(idcard:string)=>
   {
    const gpassanger=await LGetPassenger.getLPassenger(idcard);
    return gpassanger
   }
   //***************** GET PASSANGER ***************** */
    getPassangers=async()=>
   {
        const gpassangers=await LGetPassenger.getLPassengerss();
        return gpassangers
    
   }
    getLActiveSortPassengers=async()=>
  {
    let gpassangers= await LGetPassenger.getLActiveSortPassengers();
    return gpassangers
  }
  getLPassengerbyname=async(name:string,surname:string)=>
  {
    let gpassangers= await LGetPassenger.getLPassengerbyname(name,surname);
    return gpassangers
  }
   //******************* AUTENTICATION *********************** */
    loginPassenger=async(idcard:string,password:string)=>
   {  
    const lp=await LPassengerAutentication.getInstance().loginPassenger(idcard,password);
    return lp
   }
    getloginPassenger=()=>
   {
  
    const getlp= LPassengerAutentication.getInstance().passengerlogin;
    return getlp
    
   }
    logout=()=>
   {
    const logout= LPassengerAutentication.getInstance().logout();
    return logout
   }
}