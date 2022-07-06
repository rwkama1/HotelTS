class HotelReservation
{

    //#region Propieties

     static _roomarray = [];

    static get roomarray() {
        return this._roomarray;
    }
    static set roomarray(value) {
        this._roomarray = value;
    }
    
    //#endregion

  //#region Reservation
  
    static registerRoom=async(numberroom)=>
    {
       let arrayroom=this.roomarray;
       if (arrayroom.includes(numberroom)) {
         throw new Error("That room number was already indicated");
       } 
       else
       {
         return "The room number was successfully added to the list";
       }
       
    }
    
     static  getRoomsArray()
    {
        if(this.roomarray!=[])
        {
            return this.roomarray;
             
        }
        else
        {
            throw new Error("The list of number of rooms is empty");
        }
    }
     static cleanRoomsArray()
    {
        if(this.roomarray!=[])
        {
            this.roomarray=[];
            return true
             
        }
        else
        {
            throw new Error("The list of number of rooms is empty");
        }
    }

    //#endregion

}
module.exports = { HotelReservation };