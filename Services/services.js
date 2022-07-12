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
           let getMultiplePassengerServices=await DataPassengerService.getMultiplePassengerServices(arrayservices);
           return getMultiplePassengerServices
        }
        else
        {
           return  -1
        }
    }

    //************************************ */

    static  removeNumberRoomArray(numberroom)
    {
        let arrayroom=this.roomarray;
        if(this.arrayroom!=[])
        {
            if (!arrayroom.includes(numberroom)) {
                throw new Error("That room number does not exist in the list");
              } 
             for( var i = 0; i < arrayroom.length; i++){ 
    
                if ( arrayroom[i] === numberroom) { 
            
                    arrayroom.splice(i, 1); 
                }
            
            }
            return 1
        }
        else
        {
           return -1
        }
    }
     static  getNumberRoomsArray()
    {
        if(this.roomarray!=[])
        {
            return this.roomarray;
             
        }
        else
        {
           return -1
        }
    }

     static cleanNumberRoomsArray()
    {
        if(this.roomarray!=[])
        {
            this.roomarray=[];
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