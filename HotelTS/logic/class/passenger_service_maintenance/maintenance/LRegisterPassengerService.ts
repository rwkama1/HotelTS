import { FactoryData } from "../../../../data/FactoryData";
import DTOPassengerService from "../../../../shared/entity/DTOPassengerService";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicPassenger from "../../business_class/LPassenger";
import LogicPassengerService from "../../business_class/LPassengerService";

export default class LRegisterPassengerService
 {
    private static instancia: LRegisterPassengerService;
    private constructor() { }
    public static getInstance(): LRegisterPassengerService {
        if (!LRegisterPassengerService.instancia) {
            LRegisterPassengerService.instancia = new LRegisterPassengerService();
        }

        return LRegisterPassengerService.instancia;
    }
    private _objps: LogicPassengerService;
    public get objps(): LogicPassengerService {
        return this._objps;
    }
    public set objps(value: LogicPassengerService) {
        this._objps = value;
    }
    startPS=async()=>
    {
        let newpassenger=new LogicPassenger(
            "123","name1","surname2","country","town","address","78789","asd@gmail.com","","","");
        let newlogicps=new LogicPassengerService(0,newpassenger,new Date(),new Date(),0,"asd",[]);
        this.objps=newlogicps;
       
        return this.objps.getDTO()
        
    }
    registerDPS=async(idservice:number)=>
    {
        let lps=this.objps;  
        let dtodps=await lps.registerDetailPS(idservice);     
        return dtodps;
    }
    removeDPS=async(idservice:number)=> {
       
        let lps=this.objps;  
        await lps.removeDetailPS(idservice);     
        return true;
        
    }
    closePS=async(dtops:DTOPassengerService)=>{
        let lps=this.objps; 
        if (lps != null) {
            let data=lps.close(dtops);
            return data
        } 
        else
        {
            throw new LogicException("The Passenger Service is null");
        }       
    }
    savePS=async()=>
     {
        
        let lps=this.objps; 
       
        if (lps != null) {
           
            let datadps=await lps.save();
            let result=await FactoryData.getDataPassengerService().registerPassengerService(datadps);
            return result
        }
        else
        {
            throw new LogicException("The Passenger Service is null");
        }
      
    }
}