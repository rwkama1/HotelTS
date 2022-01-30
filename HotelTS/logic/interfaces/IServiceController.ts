import DTOService from "../../shared/entity/DTOService";
import { ArrayService } from "../class/business_class/array/LArrayService";
import LogicService from "../class/business_class/LService";

export default interface IServiceController 
{
    //**************** GETS ***************** */

    getService(idservice:number):Promise<DTOService>;
    getServices():Promise<DTOService[]>;

    //**************** MAINTENACE **************** */

    registerService(dtservice:DTOService):Promise<boolean>;
    updateService(dtservice:DTOService):Promise<boolean>;
    disableService(dtservice:DTOService):Promise<boolean>;    
}