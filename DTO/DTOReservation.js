const { DTOPassenger } = require("./DTOPassenger");

class DTOReservation
{
    NumberReservationn=0;
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
    
    TotalWithNumberDays()
    {
        let ArrivalDate=this.ArrivalDate;
        let DepartureDate=this.DepartureDate;
        let total=this.Total;
        let totalwithdays=0;
        let difmiliseconds=DepartureDate-ArrivalDate
        let diffsecond=Math.floor((difmiliseconds)/1000);
        let diffminutes=Math.floor(diffsecond/60);
        let diffhour=Math.floor(diffminutes/60);
        let diffdays=Math.floor(diffhour/24);

        totalwithdays=total*diffdays;
        return {totalwithdays,diffdays}
    }
   
}
module.exports = { DTOReservation };