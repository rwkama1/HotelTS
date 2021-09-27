import { FactoryData } from "../../../../data/FactoryData";
import DTOReservation from "../../../../shared/entity/DTOReservation";
import { LogicException } from "../../../../shared/exceptions/logicexception";
import LogicReservation from "../../business_class/LReservation";
import { LGetPassenger } from "../../passenger_maintenance/maintenace/LGetPassenger";

import LGetReservation from "./LGetReservation";

export default class LRegisterOnlineReservation
 {
    private static instancia: LRegisterOnlineReservation;
    private constructor() { }
    public static getInstance(): LRegisterOnlineReservation {
        if (!LRegisterOnlineReservation.instancia) {
            LRegisterOnlineReservation.instancia = new LRegisterOnlineReservation();
        }

        return LRegisterOnlineReservation.instancia;
    }
    private _objreservation: LogicReservation;
    public get objreservation(): LogicReservation {
        return this._objreservation;
    }
    public set objreservation(value: LogicReservation) {
        this._objreservation = value;
    }
     
    startReservation=async()=>
    {
        // let getobjreservation=this.objreservation;
        let newlogicr=new LogicReservation(0,new Date(),new Date(),
            new Date(),"Pending","NotConfirmed","Online",0,null,[]);
        this.objreservation=newlogicr;
        return this.objreservation
        
    }
    
    registerReservationDetail=async(numberrom:number)=>
    {
        let lreservation=this.objreservation;  
        let logicreserdetail=await lreservation.registerReservationDetail(numberrom);     
        return logicreserdetail;
    }
    removeReservationDetail=async(numberrom:number)=> {
       
        let lreservation=this.objreservation;
      await lreservation.removeRD(numberrom);     
        return true;
        
    }
    closeReservation=async()=>{
        let lreservation=this.objreservation;  
        if (lreservation != null) {
            let getreservations=await LGetReservation.getLReservations();
            let lengthreservations=getreservations.arrayreservation.length;
            lreservation.numberreservation=lengthreservations;
            lreservation.close();
        }
        else
        {
            throw new LogicException("The Reservation is null");
        }
        return lreservation;
    }
    saveReservation=async(dtreservation:DTOReservation)=>
     {
        
        let lreservation=this.objreservation;
    let getpassenger=await LGetPassenger.getLPassenger(dtreservation.idcardpassenger);
        if (lreservation != null) {
            lreservation.passenger=getpassenger;
            let dtoreservation=await lreservation.save(dtreservation);
           
            let result=await FactoryData.getDataReservation().registerReservation(dtoreservation);
            return result
        }
        else
        {
            throw new LogicException("The Reservation is null");
        }
      
    }
   
   
 }