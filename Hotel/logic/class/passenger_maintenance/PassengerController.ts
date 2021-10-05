import DTOPassenger from "../../../shared/entity/DTOPassenger";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IPassengerController from "../../interfaces/IPassengerController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
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
  
   //***************** GET PASSANGER ***************** */
   getPassanger=async(idcard:string)=>
   {
    const gpassanger=await LGetPassenger.getLPassenger(idcard);
    if(gpassanger===null)
    {
        throw new LogicException("The Passenger does not exists in the system");
        
    }
    return gpassanger.getDTO()
   }
    getPassangers=async()=>
   {
        const gpassangers=await LGetPassenger.getLPassengerss();
        let arraydto=InstanceArrayDTO.instanceArrayPassenger(gpassangers.arraypassenger);
        return arraydto
   }
    getLActiveSortPassengers=async()=>
  {
    let gpassangers= await LGetPassenger.getLActiveSortPassengers();
     let arraydto=InstanceArrayDTO.instanceArrayPassenger(gpassangers);
        return arraydto
  }
  getLPassengerbyname=async(name:string,surname:string)=>
  {
    let gpassangers= await LGetPassenger.getLPassengerbyname(name,surname);
    if(gpassangers===null)
    {
        throw new LogicException("The Passenger does not exists in the system");
        
    }
    return gpassangers.getDTO()
  }
   //******************* AUTENTICATION *********************** */
    loginPassenger=async(idcard:string,password:string)=>
   {  
    const lp=await LPassengerAutentication.getInstance().loginPassenger(idcard,password);
    return lp.getDTO()
   }
    getloginPassenger=()=>
   {
  
    const getlp= LPassengerAutentication.getInstance().passengerlogin;
    if(getlp===null)
    {
        throw new LogicException("There is no passenger logged in");
        
    }
    return getlp.getDTO()
    
   }
    logout=()=>
   {
    const logout= LPassengerAutentication.getInstance().logout();
    return logout
   }
}