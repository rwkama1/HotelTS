import { FactoryData } from "../../../../data/FactoryData";
import { ArrayService } from "../../business_class/array/LArrayService";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetService {

  
  static getLService=async(idservice:number)=>
      {
        let dataservice= await this.getLServices();
        let searchserv=dataservice.search(idservice);
        return searchserv
      }    
  static getLServices=async()=>
      {
        let arrays=[];
        let dataservice= await FactoryData.getDataService().getServices();
        for(var dts of dataservice)
        {
        const logicservice=InstanceLogicClass.instanceLService(dts);
        arrays.push(logicservice);
        }
        let arraylogicservice=new ArrayService(arrays);
        return arraylogicservice; 
      }   
    
  }