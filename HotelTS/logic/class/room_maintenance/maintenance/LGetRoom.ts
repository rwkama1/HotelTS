import { FactoryData } from "../../../../data/FactoryData";
import { ArrayRoom } from "../../business_class/array/LArrayRoom";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetRoom{

  static getLActiveSortRoom=async()=>
    {
        let dataroom= await this.getLRooms();
        let searchroom=dataroom.getActiveSort();
        return searchroom
    }
  static getLRoom=async(numberroom:number)=>
      {
        let dataroom= await this.getLRooms();
        let searchroom=dataroom.search(numberroom);
        return searchroom
      }    
  static getLRooms=async()=>
      {
        let arrayroom=[];
        let dataroom= await FactoryData.getDataRoom().getRooms();
        for(var dtroom of dataroom)
        {
        const logicroom=InstanceLogicClass.instanceLRoom(dtroom);
        arrayroom.push(logicroom);
        }
        let arraylogicroom=new ArrayRoom(arrayroom);
        return arraylogicroom; 
      }   
  }