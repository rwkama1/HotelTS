import { LogicException } from "../../../../shared/exceptions/logicexception";
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
        
        let newlogicps=new LogicPassengerService(0,null,new Date(),new Date(),0,"asd",[]);
        this.objps=newlogicps;
       
        return this.objps
        
    }
    registerDPS=async(idservice:number)=>
    {
        let lps=this.objps;  
        let logicdps=await lps.registerDetailPS(idservice);     
        return logicdps;
    }
    removeDPS=async(idservice:number)=> {
       
        let lps=this.objps;  
        await lps.removeDetailPS(idservice);     
        return true;
        
    }
    closePS=async()=>{
        let lps=this.objps; 
        if (lps != null) {
            let dtops=lps.close();
            return dtops
        } 
        else
        {
            throw new LogicException("The Passenger Service is null");
        }       
    }
}