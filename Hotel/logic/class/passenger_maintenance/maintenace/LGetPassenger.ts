import { FactoryData } from "../../../../data/FactoryData";
import { ArrayPassenger } from "../../business_class/array/LArrayPassenger";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";

export class LGetPassenger{

  static getLActiveSortPassengers=async()=>
  {
    let datapasse= await this.getLPassengerss();
    let searchpasse=datapasse.getActiveSort();
    return searchpasse
  }
    static getLPassenger=async(idcard:string)=>
    {
      let datapasse= await this.getLPassengerss();
     
      let searchpasse=datapasse.search(idcard);
      return searchpasse
    }
    static getLPassengerbyname=async(name:string,surname:string)=>
    {
      let datapasse= await this.getLPassengerss(); 
      let searchpasse=datapasse.searchbyname(name,surname);
      return searchpasse
    }
    static getLPassengerss=async()=>
    {
    let arraypassenger=[];
      let datapase= await FactoryData.getDataPassenger().getPassengers();
      for(var dtpasse of datapase)
      {
      const logicpassenger=InstanceLogicClass.instanceLPassenger(dtpasse);
      arraypassenger.push(logicpassenger);
      }
    let arraylogicpassenger=new ArrayPassenger(arraypassenger);
    return arraylogicpassenger; 
    }
   
  
}