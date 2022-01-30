import DTOPassenger from "../../shared/entity/DTOPassenger";
import { ArrayPassenger } from "../class/business_class/array/LArrayPassenger";
import LogicPassenger from "../class/business_class/LPassenger";

export default interface IPassengerController 
{
      //#region SEARCH
   getPassanger(idcard:string);
   getPassengerSearch(idcard,name,LastName,country,town,phonenumber,address,mail);
   //#endregion
  
     //#region LISTS
   getPassengers();
   getPassengerActives();
   getUsersInactive();
   SortbyIdCardDesc();
   SortbyNameDesc();
   SortbyNameAsc();
   SortbyAddressDesc();
   SortbyAddressAsc();
   SortbyPhoneDesc();
   SortbyPhoneAsc();
   SortbyCountryDesc();
   SortbyCountryAsc();
   SortbymailDesc();
    SortbyMailAsc();
   SortbyTownDesc(); 
   SortbyTownAsc();
    //#endregion
   
   //#region CUD

    registerPassenger(dtpassenger:DTOPassenger):Promise<boolean>;
    updatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    inactivatePassanger(dtpassenger:DTOPassenger):Promise<boolean>;
    //#endregion
    //#region LOGIN
    
    loginPassenger(idcard:string,password:string):Promise<DTOPassenger>;
    getloginpassenger():DTOPassenger;
    logout():boolean;
     //#endregion
 
   

    
}