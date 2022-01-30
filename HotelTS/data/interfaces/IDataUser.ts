import DTOUser from "../../shared/entity/DTOUser";

export default interface IDataUsers 
{
  
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

getUserbyID(idcard:string);
getUsersSearch(idcard,typeuser,phonenumber,address,mail);

changeStateUser(idcard:string,state:string):Promise<boolean>;
registerUser(dtuser:DTOUser):Promise<boolean>;
updateUser(dtuser:DTOUser):Promise<boolean>;

}