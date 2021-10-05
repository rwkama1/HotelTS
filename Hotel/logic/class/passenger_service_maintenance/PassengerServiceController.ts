import DTOPassengerService from "../../../shared/entity/DTOPassengerService";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IPassengerServiceController from "../../interfaces/IPassengerServiceController";
import LAddService from "./maintenance/LAddService";
import LGetPassengerService from "./maintenance/LGetPassengerServices";

import LRegisterPassengerService from "./maintenance/LRegisterPassengerService";

export class PassengerServiceController implements IPassengerServiceController{

    private static instancia: PassengerServiceController;
    private constructor() { }
    public static getInstance(): PassengerServiceController {
        if (!PassengerServiceController.instancia) {
            PassengerServiceController.instancia = new PassengerServiceController();
        }

        return PassengerServiceController.instancia;
    }
    /****************************  REGISTER *********************************** */
    startPS=async()=>
    {
        const startp=await LRegisterPassengerService.getInstance().startPS();
        return startp 
        
    }
    registerDPS=async(idservice:number)=>
    {
        const regp=await LRegisterPassengerService.getInstance().registerDPS(idservice);
        return regp 
    }
    removeDPS=async(idservice:number)=> {

        const remdps=await LRegisterPassengerService.getInstance().removeDPS(idservice);
        return remdps 
        
    }
    closePS=async(dtops:DTOPassengerService)=>
    {
        const close=await LRegisterPassengerService.getInstance().closePS(dtops);
        return close 
    }
    savePS=async()=>
    {
        const save=await LRegisterPassengerService.getInstance().savePS();
        return save 
    }

    //************************** ADD  SERVICE TO PASSENGER SERVICES *********************** */

    enterPassenger=async(idcard:string)=>
    {
        let getp=await LAddService.getInstance().enterPassenger(idcard);
        return getp
    }
    addDPS=async(dtops:DTOPassengerService)=>
    {
      let addrd=await LAddService.getInstance().addDPS(dtops);
      return addrd
    }
    //******************* GETS ********************* */
    getPSbyPassenger=async(idcard:string)=>
   {
    let getps= await LGetPassengerService.getPSbyPassenger(idcard);
    if(getps===null)
    {
        throw new LogicException("The Passenger Service does not exists in the system");
        
    }
    return getps.getDTO()
   }
    getPS=async(id:number)=>
   {
        let getps= await LGetPassengerService.getPS(id);
        if(getps===null)
        {
            throw new LogicException("The Passenger Service does not exists in the system");
            
        }
        return getps.getDTO()
   }
}