import { FactoryData } from "../../../../data/FactoryData";
import DTORoom from "../../../../shared/entity/DTORoom";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import { LGetRoom } from "./LGetRoom";

export class LCUDRoom {

    static registerRoom=async(dtroom:DTORoom)=>
          {
            const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
            let roomsh = await LGetRoom.getLRoom(logicroom.numberroom);
       if (roomsh != null) {
       if(roomsh.statee==="Active")
       {
         throw new LogicException("That Room already exists in the system");
       }
      else
       {
         const actroom=await FactoryData.getDataRoom().changeStateRoom(roomsh.numberroom,"Active");
         return actroom;
        
       }
     }   
     const dto=roomsh.getDTO();
     const regroom=await FactoryData.getDataRoom().registerRoom(dto);
     return regroom
          

          }
    static updateRoom=async(dtroom:DTORoom)=>
          {
                        const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
                        let roomsh = await LGetRoom.getLRoom(logicroom.numberroom);
            if (roomsh === null) {
                  throw new LogicException("That Room do not exists in the system");
            }
            if(roomsh.statee==="Inactive")
            {
                  throw new LogicException("That Room is inactive");
            } 
            const dto=logicroom.getDTO();
            const updateroom=await FactoryData.getDataRoom().updateRoom(dto);
            return updateroom

          }
    static InactiveRoom=async(dtoroom:DTORoom)=>
          {  

            let roomse = await LGetRoom.getLRoom(dtoroom.numberroom);
                if (roomse === null) {
                throw new LogicException("That Room do not exists in the system");
                }
                if(roomse.statee==="Inactive")
                {
                throw new LogicException("That Room is inactive");
                }
                const delroom=await FactoryData.getDataRoom().changeStateRoom(roomse.idcard,"Inactive");
                return delroom
           
          }
  }