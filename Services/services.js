const { DataPassengerService } = require("../data/DataPassengerService");



class Services
{

    //#region Properties

     static _servicesarray = [];
    static get servicesarray() {
        return Services._servicesarray;
    }
    static set servicesarray(value) {
        Services._servicesarray = value;
    }

    
    //#endregion

  //#region Services
  
    static registerService=(idservice)=>
    {
       let arrayservices=this.servicesarray;
       if (arrayservices.includes(idservice)) {
         return -1
       } 
       else
       {
        arrayservices.push(idservice);
         return 1
       }
       
    }
    static calculateTotal=async()=>
    {
      
        let arrayservices=this.servicesarray;
        if(arrayservices.length>0)
        {
           let getMultiplePassengerServices=await DataPassengerService.getMultipleDetailPassengerServices(arrayservices);
           return getMultiplePassengerServices
        }
        else
        {
           return  -1
        }
    }

    //************************************ */

    static  removeNumberServiceArray(numberservice)
    {
        let arrayservice=this.servicesarray;
        if(this.arrayservice!=[])
        {
            if (!arrayservice.includes(numberservice)) {
                throw new Error("That service number does not exist in the list");
              } 
             for( var i = 0; i < arrayservice.length; i++){ 
    
                if ( arrayservice[i] === numberservice) { 
            
                    arrayservice.splice(i, 1); 
                }
            
            }
            return 1
        }
        else
        {
           return -1
        }
    }
     static  getNumberServiceArray()
    {
        if(this.servicesarray!=[])
        {
            return this.servicesarray;
             
        }
        else
        {
           return -1
        }
    }

     static cleanNumberServiceArray()
    {
        if(this.servicesarray!=[])
        {
            this.servicesarray=[];
            return 1
             
        }
        else
        {
           return -1
        }
    }

    //#endregion

}
module.exports = { Services };