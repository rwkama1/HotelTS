import { FactoryData } from "../../../../data/FactoryData";
import DTORoom from "../../../../shared/entity/DTORoom";

export class LCUDRoom {

    static registerRoom=async(dtroom:DTORoom)=>
          {
            const regroom=await FactoryData.getDataRoom().registerRoom(dtroom);
            return regroom;

          }
    static updateRoom=async(dtroom:DTORoom)=>
          {
           
             const updateroom=await FactoryData.getDataRoom().updateRoom(dtroom);
              return updateroom;

          }
    static changeStateRoom=async(numberroom:number,state:string)=>
          {       
            const del=await FactoryData.getDataRoom().changeStateRoom(numberroom,state);
            return del;
          }
  }