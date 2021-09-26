import { FactoryData } from "../../../../data/FactoryData";
import DTOUser from "../../../../shared/entity/DTOUser";

export class LCRUDUser {

    static registerUser=async(dtuser:DTOUser)=>
          {
            const reguser=await FactoryData.getDataUser().registerUser(dtuser);
            return reguser;

          }
    static updateUser=async(dtuser:DTOUser)=>
          {
           
             const upduser=await FactoryData.getDataUser().updateUser(dtuser);
              return upduser;

          }
    static changestateUser=async(idcard:string,state:string)=>
          {       
            const del=await FactoryData.getDataUser().changeStateUser(idcard,state);
            return del;
          }
  }