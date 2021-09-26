import DTOService from "../../../shared/entity/DTOService";
import IServiceController from "../../interfaces/IServiceController";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LGetService } from "./maintenance/LGetService";

export class ServiceController implements IServiceController{

    private static instancia: ServiceController;
    private constructor() { }
    public static getInstance(): ServiceController {
        if (!ServiceController.instancia) {
            ServiceController.instancia = new ServiceController();
        }

        return ServiceController.instancia;
    }
    
    //************ CRUD ********************** */
    registerService=async(dtservice:DTOService)=>
   {   
     const logics=InstanceLogicClass.instanceLService(dtservice);
        const result=await logics.register();
        return result 
       
   }
    updateService=async(dtservice:DTOService)=>
   {
    const logics=InstanceLogicClass.instanceLService(dtservice);
    const result=await logics.update();
    return result
   }
   disableService=async(dtservice:DTOService)=>
   {
    const logics=InstanceLogicClass.instanceLService(dtservice);
    const result=await logics.disable();
    return result
   }

   
   getService=async(idservice:number)=>
   {
    const gservice=await LGetService.getLService(idservice);
    return gservice
   }
   //***************** GET SERVICES ***************** */
   getServices=async()=>
   {
        const gservices=await LGetService.getLServices();
        return gservices
    
   }
  
}