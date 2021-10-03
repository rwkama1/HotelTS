

import DTODPassengerService from "../../shared/entity/DTODPassengerService";
import DTOPassengerService from "../../shared/entity/DTOPassengerService";
import LogicPassengerService from "../class/business_class/LPassengerService";



export default interface IPassengerServiceController 
{
    //***************  REGISTER ***************** */
    startPS():Promise<DTOPassengerService>;  
    registerDPS(idservice:number):Promise<DTODPassengerService>;
    removeDPS(idservice:number):Promise<boolean>;
    closePS(dtops:DTOPassengerService):Promise<DTOPassengerService>;
    savePS():Promise<boolean>;

    //****************** ADD NEW SERVICE *********************** */

    enterPassenger(idcard:string):Promise<DTOPassengerService>;
    addDPS(dtops:DTOPassengerService):Promise<boolean>;

    //********************* GETS ***************** */
    getPSbyPassenger(idcard:string):Promise<LogicPassengerService>;
    getPS(id:number):Promise<LogicPassengerService>


}