import { FactoryData } from "../../../../data/FactoryData";
import DTOPassenger from "../../../../shared/entity/DTOPassenger";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import HashPassword from "../../encrypt/hashPassword";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetPassenger } from "./LGetPassenger";

export class LCUDPassenger {

    static registerPassenger=async(dtpassenger:DTOPassenger)=>
          {
            const logicp=InstanceLogicClass.instanceLPassenger(dtpassenger);
          
            let passengersearch = await LGetPassenger.getLPassenger(dtpassenger.idcard);
            if (passengersearch != null) {
              if(passengersearch.statee==="Active")
              {
                throw new LogicException("That Passenger already exists in the system");
              }
             else
              {
              
                const actpasse=await FactoryData.getDataPassenger().changeStatePassenger(passengersearch.idcard,"Active");
                return actpasse;
               
              }
            }
            logicp.validatePassword();
            const passh=await HashPassword.hashPassword(logicp.password);
            logicp.password=passh.hash;
            logicp.salt=passh.salt;
            const dto=logicp.getDTO();
            const reguser=await FactoryData.getDataPassenger().registerPassenger(dto);
            return reguser
            // const regpass=await FactoryData.getDataPassenger().registerPassenger(dtpassenger);
            // return regpass;

          }
    static updatePassenger=async(dtpassenger:DTOPassenger)=>
          {
            const logicp=InstanceLogicClass.instanceLPassenger(dtpassenger);

            
            let passengersearch = await LGetPassenger.getLPassenger(logicp.idcard);
            if (passengersearch === null) {
                throw new LogicException("That Passenger do not exists in the system");
            }
            if(passengersearch.statee==="Inactive")
            {
              throw new LogicException("That Passenger is inactive");
            }
            logicp.validatePassword();
            const passh=await HashPassword.hashPassword(logicp.password);
            logicp.password=passh.hash;
            logicp.salt=passh.salt;
           const dto=logicp.getDTO();
           const reguser=await FactoryData.getDataPassenger().updatePassenger(dto);
           return reguser
            //  const updpas=await FactoryData.getDataPassenger().updatePassenger(dtpassenger);
            //   return updpas;

          }
          static inactivatePassenger=async(dtouser:DTOPassenger)=>
          {   
                let passengersearch = await LGetPassenger.getLPassenger(dtouser.idcard);
                if (passengersearch === null) {
                throw new LogicException("That Passenger do not exists in the system");
                }
                if(passengersearch.statee==="Inactive")
                {
                throw new LogicException("That Passenger is inactive");
                }
              
          
                const deluser=await FactoryData.getDataPassenger().changeStatePassenger(passengersearch.idcard,"Inactive");
                return deluser
          } 
  }