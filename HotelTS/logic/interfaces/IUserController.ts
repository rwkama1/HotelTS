import DTOUser from "../../shared/entity/DTOUser";


export default interface IUserController 
{
    //**************** GETS **************** */

    getUsers():Promise<DTOUser[]>;
    getUsersActive():Promise<DTOUser[]>; 
    SortbyIdCardDesc();
    getUsersInactive();
    SortbyIdCardDesc();
    SortbyNameDesc();
    SortbyNameAsc();
    SortbyAddressDesc();
    SortbyAddressAsc();
    SortbyPhoneDesc();
    SortbyPhoneAsc();
    SortbyTypeUserDesc();
    SortbyTypeUserAsc();
    SortbymailDesc();  
    SortbyMailAsc();

    getUser(idcard:string);
   getUsersSearch(idcard,typeuser,phonenumber,address,mail);
   
    //**************** MAINTENACE **************** */

    registerUser(dtuser:DTOUser):Promise<boolean>;
    updateUser(dtuser:DTOUser):Promise<boolean>;
    inactivateUser(dtuser:DTOUser):Promise<boolean>;

     //**************** LOGIN **************** */

    loginUser(idcard:string,password:string):Promise<DTOUser>;
    getloginUser():DTOUser;
    logout():boolean;
    
}