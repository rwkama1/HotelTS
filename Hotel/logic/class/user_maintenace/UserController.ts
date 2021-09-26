import DTOUser from "../../../shared/entity/DTOUser";
import IUserController from "../../interfaces/IUserController";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LUserAutentication } from "./maintenace/LAutentication";
import { LGetUsers } from "./maintenace/LGetUsers";

export class UserController implements IUserController{

    private static instancia: UserController;
    private constructor() { }
    public static getInstance(): UserController {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }

        return UserController.instancia;
    }
    
    //************ CRUD ********************** */
    registerUser=async(dtouser:DTOUser)=>
   {   
     const logicuser=InstanceLogicClass.instanceLUser(dtouser);
        const result=await logicuser.register();
        return result 
       
   }
    updateUser=async(dtouser:DTOUser)=>
   {
    const logicuser=InstanceLogicClass.instanceLUser(dtouser);
    const result=await logicuser.update();
    return result
   }

    inactivateUser=async(dtouser:DTOUser)=>
   {
    const logicuser=InstanceLogicClass.instanceLUser(dtouser);
    const result=await logicuser.disable();
    return result
   }
    getUser=async(idcard:string)=>
   {
    const guser=await LGetUsers.getLUser(idcard);
    return guser
   }
   //***************** GETUSERS ***************** */
    getUsers=async()=>
   {
        const gusers=await LGetUsers.getLUsers();
        return gusers
    
   }
   getLActiveSortUsers=async()=>
   {
        const getactiveuser=await LGetUsers.getLActiveSortUsers();
        return getactiveuser
    
   }
   //******************* AUTENTICATION *********************** */
    loginUser=async(idcard:string,password:string)=>
   {  
    const luser=await LUserAutentication.getInstance().loginUser(idcard,password);
    return luser
   }
    getloginUser=()=>
   {
  
    const getloginuser= LUserAutentication.getInstance().userlogin;
    return getloginuser
    
   }
    logout=()=>
   {
    const logout= LUserAutentication.getInstance().logout();
    return logout
   }
}