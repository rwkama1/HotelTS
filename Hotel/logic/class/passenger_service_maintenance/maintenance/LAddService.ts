
import { FactoryData } from "../../../../data/FactoryData";
import DTOPassengerService from "../../../../shared/entity/DTOPassengerService";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicPassengerService from "../../business_class/LPassengerService";
import { LGetPassenger } from "../../passenger_maintenance/maintenace/LGetPassenger";
import LGetPassengerService from "./LGetPassengerServices";

export default class LAddService
 {
    private static instancia: LAddService;
    private constructor() { }
    public static getInstance(): LAddService {
        if (!LAddService.instancia) {
            LAddService.instancia = new LAddService();
        }

        return LAddService.instancia;
    }
    private _objps: LogicPassengerService;
    public get objps(): LogicPassengerService {
        return this._objps;
    }
    public set objps(value: LogicPassengerService) {
        this._objps = value;
    }
    enterPassenger=async(idcard:string)=>
    {
     
        let getp=await LGetPassenger.getLPassenger(idcard);
        if(getp===null)
        {
            throw new LogicException("That Passenger  does not exists in the system");
            
        }
        let getps=await LGetPassengerService.getPSbyPassenger(idcard);
        if(getps===null)
        {
            throw new LogicException("That Passenger has not services");
            
        }
       this.objps=getps;
       return this.objps.getDTO();

    }
     addDPS=async(dtops:DTOPassengerService)=>
    {
      let lps=this.objps;
      let dataps=await lps.addDPS(dtops);
      let addrd=await FactoryData.getDataPassengerService().addDPS(dataps);
      return addrd
    }
}