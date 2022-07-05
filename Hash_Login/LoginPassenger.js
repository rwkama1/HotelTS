
const { DataPassenger } = require("../data/DataPassenger");
const { HashPassword } = require("./hashPassword");

 class LoginPassenger
{

    //#region Propieties
     static _passengerlogin = null;
     static get passengerlogin() {
         return LoginPassenger._passengerlogin;
     }
     static set passengerlogin(value) {
         LoginPassenger._passengerlogin = value;
     }
    
    
    
    //#endregion

  //#region Login
  
      static loginPassenger=async(idcard,password)=>
    {
       
        let getPassenger = await DataPassenger.getPassenger(idcard);
        if (getPassenger===-1) {
           throw new Error("That Passenger does not exists in the system"); 
        }
        const verifyp=await HashPassword.verifyPassword(password,getPassenger.password,getPassenger.salt);
   
        if(verifyp===false)
        {
            throw new Error("Wrong password");
        }
   
       this.passengerlogin=getPassenger;
      
       return this.passengerlogin;
    }
    
     static  getPassengerLogin()
    {
        if(this.passengerlogin!=null)
        {
            return this.passengerlogin;
             
        }
        else
        {
            throw new Error("There is no Passenger logged in");
        }
    }
     static  logoutPassenger()
    {
        if(this.passengerlogin!=null)
        {
            this.passengerlogin=null;
            return true;
            
        }
        else
        {
            return false;
        }
    }

    //#endregion

}
module.exports = { LoginPassenger };