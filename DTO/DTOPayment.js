const { DTOPassenger } = require("./DTOPassenger");
const { DTOPassengerService } = require("./DTOPassengerService");
const { DTOReservation } = require("./DTOReservation");


class DTOPayment
{
    IDPaymentt=0
    Reservation=new DTOReservation();
	Passenger=new DTOPassenger();
	PassangerServicee=new DTOPassengerService();
	PassengerAmount=0;
	TotalRS=0;
	Datee=new Date();
    

   

    constructor()
    {

    }

   
}
module.exports = { DTOPayment };