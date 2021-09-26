import DTOUser from "../../shared/entity/DTOUser";
import { ArrayUser } from "../class/business_class/array/LArrayUser";
import LogicUser from "../class/business_class/LUser";

export default interface IUserController 
{
    getUser(idcard:string):Promise<LogicUser>;
    getUsers():Promise<ArrayUser>;
    getLActiveSortUsers():Promise<LogicUser[]>;
   
    registerUser(dtuser:DTOUser):Promise<boolean>;
    updateUser(dtuser:DTOUser):Promise<boolean>;
    inactivateUser(dtuser:DTOUser):Promise<boolean>;
    
    loginUser(idcard:string,password:string):Promise<LogicUser>;
    getloginUser():LogicUser;
    logout():boolean;
    
}