import DTOUser from "../../shared/entity/DTOUser";

export default interface IDataUsers 
{
    getUsers():Promise<DTOUser[]>; 
    changeStateUser(idcard:string,state:string):Promise<boolean>;
    registerUser(dtuser:DTOUser):Promise<boolean>;
    updateUser(dtuser:DTOUser):Promise<boolean>;
}