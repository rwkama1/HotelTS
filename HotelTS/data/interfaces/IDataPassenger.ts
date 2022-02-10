import DTOPassenger from "../../shared/entity/DTOPassenger";

export default interface IDataPassenger 
{
   
    changeStatePassenger(idcard:string,state:string):Promise<boolean>;
    registerPassenger(dtuser:DTOPassenger):Promise<boolean>;
    updatePassenger(dtuser:DTOPassenger):Promise<boolean>;

    //#region SEARCH

  
    getPassengerbyID(idcard:string);
    getPassengerSearch(idcard,name,LastName,country,town,phonenumber,address,mail);

    //#endregion

    //#region LISTS
    getPassengers():Promise<DTOPassenger[]>; 
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
}