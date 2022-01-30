import { FactoryData } from "../../../data/FactoryData";
import DTOPassenger from "../../../shared/entity/DTOPassenger";
import { LogicException } from "../../../shared/exceptions/logicexception";
import IPassengerController from "../../interfaces/IPassengerController";
import { InstanceArrayDTO } from "../extras/instanceArrayDTO";
import { InstanceLogicClass } from "../extras/instanceBusinessClass";
import { LCUDPassenger } from "./maintenace/LCUDPassenger";
import { LGetPassenger } from "./maintenace/LGetPassenger";
import { LPassengerAutentication } from "./maintenace/LPassengerAutentication";

export class PassengerController implements IPassengerController{

    private static instancia: PassengerController;
    private constructor() { }
    public static getInstance(): PassengerController {
        if (!PassengerController.instancia) {
            PassengerController.instancia = new PassengerController();
        }

        return PassengerController.instancia;
    }
    
     //#region CUD
    registerPassenger=async(dtpassenger:DTOPassenger)=>
   {   
    return LCUDPassenger.registerPassenger(dtpassenger);
       
   }
    updatePassanger=async(dtpassenger:DTOPassenger)=>
   {
    return LCUDPassenger.updatePassenger(dtpassenger);
   }

    inactivatePassanger=async(dtpassenger:DTOPassenger)=>
   {
    return LCUDPassenger.inactivatePassenger(dtpassenger);
   }
  //#endregion

    //#region SEARCH
   getPassanger=async(idcard:string)=>
   {
          const guser=await LGetPassenger.getLPassenger(idcard);
    if(guser===null)
    {
        throw new LogicException("The Passenger does not exists in the system");
        
    }
    return guser.getDTO()
   }
   getPassengerSearch=async(idcard,name,LastName,country,town,phonenumber,address,mail)=>
     {
   
        return FactoryData.getDataPassenger().getPassengerSearch(idcard,name,LastName,country
            ,town,phonenumber,address,mail);
     }
   //#endregion
   //#region LISTS
   getPassengers=async()=>
   {
    return FactoryData.getDataPassenger().getPassengers();
    }
   getPassengerActives=async()=>
   {
    return FactoryData.getDataPassenger().getPassengerActives();
   }
   getUsersInactive=async()=>
   {
    return FactoryData.getDataPassenger().getUsersInactive();
   }
   SortbyIdCardDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyIdCardDesc();
   }
   SortbyNameDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyNameDesc();
   }
   SortbyNameAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyNameAsc();
   }
   SortbyAddressDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyAddressDesc();
   }
   SortbyAddressAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyAddressAsc();
   }
   SortbyPhoneDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyPhoneDesc();
   }
   SortbyPhoneAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyPhoneAsc();
   }   
   SortbyCountryDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyCountryDesc();
   }
   SortbyCountryAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyCountryAsc();
   }
   SortbymailDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbymailDesc();
   }  
   SortbyMailAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyMailAsc();
   }
   SortbyTownDesc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyTownDesc();
   }  
   SortbyTownAsc=async()=>
   {
    return FactoryData.getDataPassenger().SortbyTownAsc();
   }
    //#endregion
    //#region AUTENTICATION
loginPassenger=async(idcard:string,password:string)=>
{  
 const luser=await LPassengerAutentication.getInstance().loginPassenger(idcard,password);
 return luser.getDTO()
}
 getloginpassenger=()=>
{

 const getloginpassenger= LPassengerAutentication.getInstance().passengerlogin;
 if(getloginpassenger===null)
 {
     throw new LogicException("There is no passenger logged in");
     
 }
 return getloginpassenger.getDTO()
 
}
 logout=()=>
{
 const logout= LPassengerAutentication.getInstance().logout();
 return logout
}
//#endregion
  
}