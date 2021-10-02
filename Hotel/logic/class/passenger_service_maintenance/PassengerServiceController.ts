import IPassengerServiceController from "../../interfaces/IPassengerServiceController";

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
}