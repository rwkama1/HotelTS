const { DTOReservation } = require("./DTOReservation");
const { DTORoom } = require("./DTORoom");

class DTOReservationDetail
{
    NumberRD =0;
    Value=0;
    Reservation=new DTOReservation();
    Room=new DTORoom();
    
    constructor()
    {

    }
   
}
module.exports = { DTOReservationDetail };