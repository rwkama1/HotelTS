import { FactoryData } from "../../../data/FactoryData";
import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IUserController from "../../interfaces/IUserController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LUserAutentication } from "./maintenace/LAutentication";
import { LCRUDUser } from "./maintenace/LCUDUsers";
import { LGetUsers } from "./maintenace/LGetUsers";

export class UserController implements IUserController{
    //#region SINGLETON
    private static instancia: UserController;
    private constructor() { }
    public static getInstance(): UserController {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }

        return UserController.instancia;
    }
    //#endregion
    
    
  
    //#region CUD
    registerUser=async(dtouser:DTOUser)=>
    {   
        return LCRUDUser.registerUser(dtouser);
        
    }
     updateUser=async(dtouser:DTOUser)=>
    {
        return LCRUDUser.updateUser(dtouser);
    }
 
     inactivateUser=async(dtouser:DTOUser)=>
    {
        return LCRUDUser.inactivateUser(dtouser);
    }
    //#endregion
     //#region SEARCH
     getUser=async(idcard:string)=>
     {
      const guser=await LGetUsers.getLUser(idcard);
      if(guser===null)
      {
          throw new LogicException("The User does not exists in the system");
          
      }
      return guser.getDTO()
     }
     getUsersSearch=async(idcard,typeuser,phonenumber,address,mail)=>
     {
        const guser=await FactoryData.getDataUser().getUsersSearch(idcard,typeuser,phonenumber,address,mail)
        return guser;
     }
 
     //#endregion
     
    //#region LISTS
    getUsers=async()=>
    {
  
        const guser=await FactoryData.getDataUser().getUsers();
        return guser;
    }

    getUsersActive=async()=>
    {
        const guser=await FactoryData.getDataUser().getUsersActive();
        return guser;
    }
    getUsersInactive=async()=>
    {
        const guser=await FactoryData.getDataUser().getUsersInactive();
        return guser;
    }
    SortbyIdCardDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyIdCardDesc();
        return guser;
    }
    SortbyNameDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyNameDesc();
        return guser;
    }
    SortbyNameAsc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyNameAsc();
        return guser;
    }
    SortbyAddressDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyAddressDesc();
        return guser;
    }
    SortbyAddressAsc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyAddressAsc();
        return guser;
    }
    SortbyPhoneDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyPhoneDesc();
        return guser;
    }
    SortbyPhoneAsc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyPhoneAsc();
        return guser;
    }   
    SortbyTypeUserDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyTypeUserDesc();
        return guser;
    }
    SortbyTypeUserAsc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyTypeUserAsc();
        return guser;
    }
    SortbymailDesc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbymailDesc();
        return guser;
    }  
    SortbyMailAsc=async()=>
    {
        const guser=await FactoryData.getDataUser().SortbyMailAsc();
        return guser;
    }
    //#endregion
  

//#region AUTENTICATION
loginUser=async(idcard:string,password:string)=>
{  
 const luser=await LUserAutentication.getInstance().loginUser(idcard,password);
 return luser.getDTO()
}
 getloginUser=()=>
{

 const getloginuser= LUserAutentication.getInstance().userlogin;
 if(getloginuser===null)
 {
     throw new LogicException("There is no user logged in");
     
 }
 return getloginuser.getDTO()
 
}
 logout=()=>
{
 const logout= LUserAutentication.getInstance().logout();
 return logout
}
//#endregion
  
}