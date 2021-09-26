import { FactoryData } from "../../../../data/FactoryData";
import DTOPassenger from "../../../../shared/entity/DTOPassenger";

export class LCUDPassenger {

    static registerPassenger=async(dtpassenger:DTOPassenger)=>
          {
            const regpass=await FactoryData.getDataPassenger().registerPassenger(dtpassenger);
            return regpass;

          }
    static updatePassenger=async(dtpassenger:DTOPassenger)=>
          {
           
             const updpas=await FactoryData.getDataPassenger().updatePassenger(dtpassenger);
              return updpas;

          }
    static changestatePassenger=async(idcard:string,state:string)=>
          {       
            const del=await FactoryData.getDataPassenger().changeStatePassenger(idcard,state);
            return del;
          }
  }