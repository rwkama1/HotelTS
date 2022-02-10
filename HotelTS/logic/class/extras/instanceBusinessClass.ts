import DTOPassenger from "../../../shared/entity/DTOPassenger";
import DTOPassengerService from "../../../shared/entity/DTOPassengerService";
import DTOPayment from "../../../shared/entity/DTOPayment";
import DTOReservation from "../../../shared/entity/DTOReservation";
import DTORoom from "../../../shared/entity/DTORoom";
import DTOService from "../../../shared/entity/DTOService";
import DTOUser from "../../../shared/entity/DTOUser";
import LogicReservationDetail from "../business_class/LDetailReservation";
import LogicDPassengerService from "../business_class/LDPassengerService";
import LogicPassenger from "../business_class/LPassenger";
import LogicPassengerService from "../business_class/LPassengerService";
import LogicPayment from "../business_class/LPayment";
import LogicReservation from "../business_class/LReservation";
import LogicRoom from "../business_class/LRoom";
import LogicService from "../business_class/LService";
import LogicUser from "../business_class/LUser";
import { LGetPassenger } from "../passenger_maintenance/maintenace/LGetPassenger";
import LGetPassengerService from "../passenger_service_maintenance/maintenance/LGetPassengerServices";
import LGetReservation from "../reservation_maintenance/maintenance/LGetReservation";
import { LGetRoom } from "../room_maintenance/maintenance/LGetRoom";
import { LGetService } from "../service_maintenance/maintenance/LGetService";

export class InstanceLogicClass
{
    static instanceLUser=(dtouser:DTOUser)=>
    {
        var logicuser=null;
        if (dtouser!=null) 
        {
            logicuser =new LogicUser(dtouser.idcard,
                dtouser.name,dtouser.surname,dtouser.address,dtouser.phone,
                dtouser.typeuserr,dtouser.password,dtouser.hashh,dtouser.maill,
                dtouser.statee);
               
        }
        return logicuser;
    }
    static instanceLPassenger=(dtopassenger:DTOPassenger)=>
    {
        var logicpassenger=null;
        if (dtopassenger!=null) 
        {
            logicpassenger=new LogicPassenger(dtopassenger.idcard,
                dtopassenger.name,dtopassenger.surname,dtopassenger.country,dtopassenger.town,
                dtopassenger.address,dtopassenger.phone,dtopassenger.maill,dtopassenger.salt,dtopassenger.password,
                dtopassenger.statee);
              
        }
        return logicpassenger
        
    }
    static instanceLRoom=(dtoroom:DTORoom)=>
    {
        var logicroom=null;
        if (dtoroom!=null) 
        {
         logicroom=new LogicRoom(dtoroom.numberroom,
            dtoroom.typeroom,dtoroom.typebed,
            dtoroom.acommodation,dtoroom.description,
            dtoroom.value,dtoroom.statee,dtoroom.image);
           
         }
         return logicroom
    }
    static instanceLService=(dtoservice:DTOService)=>
    {
        var logicservice=null;
        if (dtoservice!=null) 
        {
         logicservice=new LogicService(dtoservice.idservice,
            dtoservice.name,dtoservice.value,dtoservice.statee);
             logicservice
        }
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
    static instanceLPS=async(dtops:DTOPassengerService)=>
    {
        let arraylogicdps=[];
        let searchp=await LGetPassenger.getLPassenger(dtops.idcardp);
        for(let dtodps of dtops.listdetailps)
        {
            let searchs=await LGetService.getLService(dtodps.idservice);
            let logicdps=new LogicDPassengerService(dtodps.numberdetailps,searchs,dtodps.amount);
            arraylogicdps.push(logicdps);
        }
        let logicps=new LogicPassengerService(
            dtops.numberps,searchp,dtops.startdate,dtops.enddate,dtops.total,dtops.observations,arraylogicdps);
            return logicps
    }
    static instancePayment=async(dtopayment:DTOPayment)=>
    {
        let spassenger=await LGetPassenger.getLPassenger(dtopayment.idcardpassenger);
        let spassengerservice=await LGetPassengerService.getPS(dtopayment.idpassengerservice);
        let sreservation=await LGetReservation.getLReservation(dtopayment.numberreservation);
        let logicpayment=new LogicPayment(dtopayment.idpayment,spassenger,sreservation
            ,spassengerservice,dtopayment.passengeramount,dtopayment.totalrs,dtopayment.date);
            return logicpayment
    }
}