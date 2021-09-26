import { FactoryData } from "../../../../data/FactoryData";
import DTOPassenger from "../../../../shared/entity/DTOPassenger";
import { LogicException } from "../../../../shared/exceptions/logicexception";

import LogicReservation from "../../business_class/LReservation";
import { InstanceLogicClass } from "../../extras/instanceBusinessClass";
import LGetReservation from "./LGetReservation";



export default class LRegisterHotelReservation
 {
    private static instancia: LRegisterHotelReservation;
    private constructor() { }
    public static getInstance(): LRegisterHotelReservation {
        if (!LRegisterHotelReservation.instancia) {
            LRegisterHotelReservation.instancia = new LRegisterHotelReservation();
        }

        return LRegisterHotelReservation.instancia;
    }
    private _objreservation: LogicReservation;
    public get objreservation(): LogicReservation {
        return this._objreservation;
    }
    public set objreservation(value: LogicReservation) {
        this._objreservation = value;
    }
     
    enterPassenger=async(idcard:string)=>
    {
        // let getobjreservation=this.objreservation;
        let newlogicr=new LogicReservation(0,new Date(),new Date(),
            new Date(),"Pending","NotConfirmed","Hotel",0,null,[]);
        this.objreservation=newlogicr;
        let enterp= this.objreservation.enterPassenger(idcard);

        return enterp
        
    }
    registerPassenger=async(dtopassenger:DTOPassenger)=>
    {
        let lreservation=this.objreservation;
        if(lreservation.passenger===null)
        {
            const logicp=InstanceLogicClass.instanceLPassenger(dtopassenger);
            const result=await logicp.register();
            if(result===true)
            {
                let enterp=lreservation.enterPassenger(logicp.idcard);
                return enterp
            }
        }
        else
        {
            throw new LogicException("The Passenger already exists");
            
        }
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
    saveReservation=async(reservationdate:Date,arrivaldate:Date,departuredate:Date)=>
     {
        
        let lreservation=this.objreservation;
        if (lreservation != null) {
            let dtoreservation=await lreservation.save(reservationdate,arrivaldate,departuredate);
            let result=await FactoryData.getDataReservation().registerReservation(dtoreservation);
            return result
        }
        else
        {
            throw new LogicException("The Reservation is null");
        }
      
    }
   
   
 }