const { DTOPassenger } = require("./DTOPassenger");

class DTOPassengerService
{
    NumberPS =0;
    Passenger=new DTOPassenger();
    StartDate=new Date();
    EndDate=new Date();
    Total=0;
    Observations="";
    
    constructor()
    {

    }
  
}
module.exports = { DTOPassengerService };