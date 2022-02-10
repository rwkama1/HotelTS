import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicUser from "../../business_class/LUser";
import HashPassword from "../../encrypt/hashPassword";
import { LGetUsers } from "./LGetUsers";

export class LUserAutentication
{
    private static instancia: LUserAutentication;
    private constructor() { }
    public static getInstance(): LUserAutentication {
        if (!LUserAutentication.instancia) {
            LUserAutentication.instancia = new LUserAutentication();
        }

        return LUserAutentication.instancia;
    }
    
    private _userlogin: LogicUser;
    public get userlogin(): LogicUser {
        return this._userlogin;
    }
    public set userlogin(value: LogicUser) {
        this._userlogin = value;
    }
   
     loginUser=async(idcard:string,password:string)=>
    {
        let usersearch = await LGetUsers.getLUser(idcard);
        if(usersearch===null)
        {
            throw new LogicException("That User does not exists in the system");

        }
        if(usersearch.statee==="Inactive")
        {
          throw new LogicException("That User is inactive");
        }
        const verifyp=await HashPassword.verifyPassword(password,usersearch.password,usersearch.hashh);
   
        if(verifyp===false)
        {
            throw new LogicException("Wrong password");
        }
       
       this.userlogin=usersearch;
       return  this.userlogin;
    }
     logout()
    {
        let lguser=this.userlogin;
        if(lguser!=null)
        {
            this.userlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }
    
}