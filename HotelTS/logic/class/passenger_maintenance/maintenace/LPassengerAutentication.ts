import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicPassenger from "../../business_class/LPassenger";
import HashPassword from "../../encrypt/hashPassword";
import { LGetPassenger } from "./LGetPassenger";

export class LPassengerAutentication
{
    private static instancia: LPassengerAutentication;
    private constructor() { }
    public static getInstance(): LPassengerAutentication {
        if (!LPassengerAutentication.instancia) {
            LPassengerAutentication.instancia = new LPassengerAutentication();
        }

        return LPassengerAutentication.instancia;
    }
    
    private _passengerlogin: LogicPassenger;
    public get passengerlogin(): LogicPassenger {
        return this._passengerlogin;
    }
    public set passengerlogin(value: LogicPassenger) {
        this._passengerlogin = value;
    }
    
   
     loginPassenger=async(idcard:string,password:string)=>
    {
        let passengersearch = await LGetPassenger.getLPassenger(idcard);
        if(passengersearch===null)
        {
            throw new LogicException("That Passenger does not exists in the system");

        }
        if(passengersearch.statee==="Inactive")
        {
          throw new LogicException("That Passenger is inactive");
        }
        const verifyp=await HashPassword.verifyPassword(password,passengersearch.password,passengersearch.salt);
   
        if(verifyp===false)
        {
            throw new LogicException("Wrong password");
        }
       
       this.passengerlogin=passengersearch;
       return  this.passengerlogin;
  
    }
     logout()
    {
        let lguser=this.passengerlogin;
        if(lguser!=null)
        {
            this.passengerlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }
    
}