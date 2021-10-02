

import LogicDPassengerService from "../class/business_class/LDPassengerService";
import LogicPassengerService from "../class/business_class/LPassengerService";

export default interface IPassengerServiceController 
{
    startPS():Promise<LogicPassengerService>;  
    registerDPS(idservice:number):Promise<LogicDPassengerService>
}