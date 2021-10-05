import DTOPassenger from "../../shared/entity/DTOPassenger";
import { ArrayPassenger } from "../class/business_class/array/LArrayPassenger";
import LogicPassenger from "../class/business_class/LPassenger";

export default interface IPassengerController 
{
    //***********************GETS **************** */

    getPassanger(idcard:string):Promise<DTOPassenger>;
    getLPassengerbyname(name:string,surname:string):Promise<DTOPassenger>;
    getPassangers():Promise<DTOPassenger[]>;
    getLActiveSortPassengers():Promise<DTOPassenger[]>;

   //******************** MAINTENANCE ******************* */

    registerPassenger(dtpassenger:DTOPassenger):Promise<boolean>;
    updatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    inactivatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    
    //******************** LOGIN ******************* */

    loginPassenger(idcard:string,password:string):Promise<DTOPassenger>;
    getloginPassenger():DTOPassenger;
    logout():boolean;
    
}