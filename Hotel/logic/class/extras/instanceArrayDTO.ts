import LogicPassenger from "../business_class/LPassenger";
import LogicReservation from "../business_class/LReservation";
import LogicRoom from "../business_class/LRoom";
import LogicService from "../business_class/LService";
import LogicUser from "../business_class/LUser";

export class InstanceArrayDTO
{
  
    static instanceArrayUser=(larrayuser:LogicUser[])=>
    {
        let arraydto=[];
        for(let user of larrayuser)
        {
            let dtouser=user.getDTO();
            arraydto.push(dtouser);

        }
        return arraydto;       
    }
    static instanceArrayPassenger=(larraypassenger:LogicPassenger[])=>
    {
        let arraydto=[];
        for(let passenger of larraypassenger)
        {
            let dtopass=passenger.getDTO();
            arraydto.push(dtopass);

        }
        return arraydto;       
    }
    static instanceArrayRoom=(larrayroom:LogicRoom[])=>
    {
        let arraydto=[];
        for(let room of larrayroom)
        {
            let dtoroom=room.getDTO();
            arraydto.push(dtoroom);

        }
        return arraydto;       
    }
    static instanceArrayService=(larrayservice:LogicService[])=>
    {
        let arraydto=[];
        for(let service of larrayservice)
        {
            let dtos=service.getDTO();
            arraydto.push(dtos);

        }
        return arraydto;       
    }
    static instanceArrayReservation=(larrayr:LogicReservation[])=>
    {
        let arraydto=[];
        for(let res of larrayr)
        {
            let dtor=res.getDTO();
            arraydto.push(dtor);

        }
        return arraydto;       
    }


}