import { FactoryData } from "../../../../data/FactoryData";
import DTOUser from "../../../../shared/entity/DTOUser";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import HashPassword from "../../encrypt/hashPassword";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetUsers } from "./LGetUsers";

export class LCRUDUser {

static registerUser=async(dtouser:DTOUser)=>
            {
      const logicuser=InstanceLogicClass.instanceLUser(dtouser);

      let usersearch = await LGetUsers.getLUser(logicuser.idcard);
      if (usersearch != null) {
      if(usersearch.statee==="Active")
      {
      throw new LogicException("That User already exists in the system");
      }
      else
      {

      const actuser=await FactoryData.getDataUser().changeStateUser(usersearch.idcard,"Active");
      return actuser;

      }
      }
      logicuser.validatePassword();
      const passh=await HashPassword.hashPassword(logicuser.password);
      logicuser.password=passh.hash;
      logicuser.hashh=passh.salt;
      const dto=logicuser.getDTO();
      const reguser=await FactoryData.getDataUser().registerUser(dto);
      return reguser;

 }
static updateUser=async(dtouser:DTOUser)=>
{
      const logicuser=InstanceLogicClass.instanceLUser(dtouser);

      let usersearch = await LGetUsers.getLUser(logicuser.idcard);
      if (usersearch === null) {
            throw new LogicException("That User do not exists in the system");
      }
      if(usersearch.statee==="Inactive")
      {
      throw new LogicException("That User is inactive");
      }
      logicuser.validatePassword();
      const passh=await HashPassword.hashPassword(logicuser.password);
      logicuser.password=passh.hash;
      logicuser.hashh=passh.salt;
      const dto=logicuser.getDTO();
      const updateuser=await FactoryData.getDataUser().updateUser(dto);
      return updateuser
      // 

}
static inactivateUser=async(dtouser:DTOUser)=>
{   
      let usersearch = await LGetUsers.getLUser(dtouser.idcard);
      if (usersearch === null) {
      throw new LogicException("That User do not exists in the system");
      }
      if(usersearch.statee==="Inactive")
      {
      throw new LogicException("That User is inactive");
      }
    

      const deluser=await FactoryData.getDataUser().changeStateUser(usersearch.idcard,"Inactive");
      return deluser
}                                   
}