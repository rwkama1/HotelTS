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
  
    
    // CREATE TABLE Reservation(
    //     NumberReservationn int NOT NULL PRIMARY KEY Identity(1,1),
    //     ReservationDate date NOT NULL,
    //     ArrivalDate date NOT NULL,
    //     DepartureDate  date NOT NULL,
    //     ProcessStatus varchar(20) NOT NULL,
    //     ConfirmationStatus varchar(20) NOT NULL,
    //     Origin varchar(20) NOT NULL,
    //     Total money NOT NULL,
    //     IDCardPassengerr varchar(20) not null Foreign Key References Passenger(IDCard),
    // ) 
    // go
    
    constructor()
    {

    }
   
}
module.exports = { DTOReservation };