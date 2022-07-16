const { DTOPassenger } = require("./DTOPassenger");

class DTOPassengerService
{
    NumberPS =0;
    Passenger=new DTOPassenger();
    StartDate=new Date();
    EndDate=new Date();
    Total=0;
    Observations="";
    

    TotalWithNumberDays()
    {
        let EndDate=this.EndDate;
        let StartDate=this.StartDate;
        let total=this.Total;
        let totalwithdays=0;
        let difmiliseconds=EndDate-StartDate;
        let diffsecond=Math.floor((difmiliseconds)/1000);
        let diffminutes=Math.floor(diffsecond/60);
        let diffhour=Math.floor(diffminutes/60);
        let diffdays=Math.floor(diffhour/24);

        totalwithdays=total*diffdays;
        return {totalwithdays,diffdays}
    }
    constructor()
    {

    }
  
}
module.exports = { DTOPassengerService };