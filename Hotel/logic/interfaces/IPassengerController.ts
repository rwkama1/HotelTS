import DTOPassenger from "../../shared/entity/DTOPassenger";
import { ArrayPassenger } from "../class/business_class/array/LArrayPassenger";
import LogicPassenger from "../class/business_class/LPassenger";

export default interface IPassengerController 
{
    getPassanger(idcard:string):Promise<LogicPassenger>;
    getPassangers():Promise<ArrayPassenger>;
    getLActiveSortPassengers():Promise<LogicPassenger[]>;
   
    registerPassenger(dtpassenger:DTOPassenger):Promise<boolean>;
    updatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    inactivatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    
    loginPassenger(idcard:string,password:string):Promise<LogicPassenger>;
    getloginPassenger():LogicPassenger;
    logout():boolean;
    
}