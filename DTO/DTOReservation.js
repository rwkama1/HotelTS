const { DTOPassenger } = require("./DTOPassenger");

class DTOReservation
{
    NumberReservationn="";
    ReservationDate=new Date();
    ArrivalDate=new Date();
    DepartureDate=new Date();
    ProcessStatus="";
    ConfirmationStatus="";
    Origin="";
    Total=0;
    Passengerr=new DTOPassenger();
  
  
    
    constructor()
    {

    }
   
}
module.exports = { DTOReservation };