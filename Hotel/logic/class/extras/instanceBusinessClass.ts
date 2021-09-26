import DTOPassenger from "../../../shared/entity/DTOPassenger";
import DTOReservation from "../../../shared/entity/DTOReservation";
import DTORoom from "../../../shared/entity/DTORoom";
import DTOService from "../../../shared/entity/DTOService";
import DTOUser from "../../../shared/entity/DTOUser";
import LogicReservationDetail from "../business_class/LDetailReservation";
import LogicPassenger from "../business_class/LPassenger";
import LogicReservation from "../business_class/LReservation";
import LogicRoom from "../business_class/LRoom";
import LogicService from "../business_class/LService";
import LogicUser from "../business_class/LUser";
import { LGetPassenger } from "../passenger_maintenance/maintenace/LGetPassenger";
import { LGetRoom } from "../room_maintenance/maintenance/LGetRoom";

export class InstanceLogicClass
{
    static instanceLUser=(dtouser:DTOUser)=>
    {
        var logicuser=new LogicUser(dtouser.idcard,
            dtouser.name,dtouser.surname,dtouser.address,dtouser.phone,
            dtouser.typeuserr,dtouser.password,dtouser.hashh,dtouser.maill,
            dtouser.statee);
            return logicuser
    }
    static instanceLPassenger=(dtopassenger:DTOPassenger)=>
    {
        var logicpassenger=new LogicPassenger(dtopassenger.idcard,
            dtopassenger.name,dtopassenger.surname,dtopassenger.country,dtopassenger.town,
            dtopassenger.address,dtopassenger.phone,dtopassenger.maill,dtopassenger.salt,dtopassenger.password,
            dtopassenger.statee);
            return logicpassenger
    }
    static instanceLRoom=(dtoroom:DTORoom)=>
    {
        var logicroom=new LogicRoom(dtoroom.numberroom,
            dtoroom.typeroom,dtoroom.typebed,
            dtoroom.acommodation,dtoroom.description,
            dtoroom.value,dtoroom.statee,dtoroom.image);
            return logicroom
    }
    static instanceLService=(dtoservice:DTOService)=>
    {
        var logicservice=new LogicService(dtoservice.idservice,
            dtoservice.name,dtoservice.value,dtoservice.statee);
            return logicservice
    }
    static instanceLReservation=async(dtoreservation:DTOReservation)=>
    {
        let arraylogicdetailreservation=[];
        let searchpassenger=await LGetPassenger.getLPassenger(dtoreservation.idcardpassenger);
        for(let dtodetailreservation of dtoreservation.listDetailReservation)
        {
            let searchroom=await LGetRoom.getLRoom(dtodetailreservation.numberroom);
            let logicdetailr=new LogicReservationDetail(dtodetailreservation.numberrd,
            dtodetailreservation.value,searchroom);
            arraylogicdetailreservation.push(logicdetailr);
        }
        var logicreservation=new LogicReservation(dtoreservation.numberreservation,dtoreservation.reservationdate,
            dtoreservation.arrivaldate,dtoreservation.departuredate,dtoreservation.processtatus,
            dtoreservation.confirmationstatus,dtoreservation.origin,dtoreservation.total,
            searchpassenger,arraylogicdetailreservation);
            return logicreservation
    }
}