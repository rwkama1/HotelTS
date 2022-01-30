import { FactoryData } from "../../../../data/FactoryData";
import DTOService from "../../../../shared/entity/DTOService";

export class LCUDService {

    static registerService=async(dtservice:DTOService)=>
          {
            const regs=await FactoryData.getDataService().registerService(dtservice);
            return regs;

          }
    static updateService=async(dtservice:DTOService)=>
          {      
             const upser=await FactoryData.getDataService().updateService(dtservice);
              return upser;

          }
    static changeStateService=async(idservice:number,state:string)=>
       {                 
          const del=await FactoryData.getDataService().changeStateService(idservice,state);
           return del;
        }
    
  }