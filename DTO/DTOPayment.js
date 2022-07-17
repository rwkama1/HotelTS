
class DTOPayment
{
    IDPaymentt=0;
    NumberReservation=0;
    IDCardPa="";
    IDPassangerServicee=0;
    PassengerAmount=0;
    TotalPayment=0;
    Datee=new Date();

   //Detail Reservation

    NumberRD=0;
    Value=0;
    NumberRoom=0;
  
    //Reservation 

    ReservationDate=new Date();
    ArrivalDate=new Date();
    DepartureDate=new Date();
    ProcessStatus="";
    ConfirmationStatus="";
    Origin="";
    TotalReservation=0;

    //Detail Passenger Service

    IDDPassangerService=0;
    IDServicee=0;
    Amount=0;
  
    //Passenger Services
    
    StartDate=new Date();
    EndDate=new Date();
    TotalPS=0;
    Observations="";
    

   

    constructor()
    {

    }

   
}
module.exports = { DTOPayment };