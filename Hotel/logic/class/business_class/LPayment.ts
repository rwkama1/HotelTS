import DTOPayment from "../../../shared/entity/DTOPayment";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LGetPassenger } from "../passenger_maintenance/maintenace/LGetPassenger";
import LGetPassengerService from "../passenger_service_maintenance/maintenance/LGetPassengerServices";
import LGetReservation from "../reservation_maintenance/maintenance/LGetReservation";
import LogicPassenger from "./LPassenger";
import LogicPassengerService from "./LPassengerService";
import LogicReservation from "./LReservation";

export  default class LogicPayment
{
    
  
    private _idpayment: number;
    private _reservation: LogicReservation;
    private _passengerservice: LogicPassengerService;
    private _passengeramount: number;
    private _passenger: LogicPassenger;
    private _totalrs: number;
    private _date: Date;

 //**************** GETTERS *********************** */

    public get idpayment(): number {
        return this._idpayment;
    }
    public get reservation(): LogicReservation {
        return this._reservation;
    }
    public get passengerservice(): LogicPassengerService {
        return this._passengerservice;
    }
    public get passengeramount(): number {
        return this._passengeramount;
    }
    public get totalrs(): number {
        return this._totalrs;
    }
    public get date(): Date {
        return this._date;
    }
    public get passenger(): LogicPassenger {
        return this._passenger;
    }

    //**************** SETTERS *********************** */

    public set idpayment(value: number) {
        this._idpayment = value;
    } 
    public set reservation(value: LogicReservation) {
        this._reservation = value;
    }
    public set passengerservice(value: LogicPassengerService) {
        this._passengerservice = value;
    }
    public set passengeramount(value: number) {
        if(value<=0)
        {
            throw new LogicException("The Passenger amount must be greater than 0");
            
        }
        if(this.totalrs>value)
        {
            throw new LogicException("The Total must be less than the passenger amount");
            
        }
        this._passengeramount = value;
    }
    public set totalrs(value: number) {
        if(value<=0)
        {
            throw new LogicException("The Total must be greater than 0");
            
        }
        this._totalrs = value;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public set passenger(value: LogicPassenger) {
        this._passenger = value;
    }
   
   
    getDTO=()=>
    {
        let dtopay=new DTOPayment(this.idpayment,this.passenger.idcard,
            this.reservation.numberreservation,this.passengerservice.numberps,this.passengeramount
            ,this.totalrs,this.date);
          return dtopay 
    }
    
    enterPassenger=async(idcard: string)=> {
        let getpassenger =await LGetPassenger.getLPassenger(idcard);
        if(getpassenger===null)
        {
            throw new LogicException("That Passenger does not exists in the system");
            
        }
        let getreservations=await LGetReservation.getLReservationPassenger(getpassenger.idcard);
        if(getreservations===null)
        {
            throw new LogicException("That Passenger has not reservations");
            
        }
        this.passenger=getpassenger;
        return getreservations
    }
    enterReservationsService=async(numberr: number)=> {
        let getr =await LGetReservation.getLReservation(numberr);
        if(getr===null)
        {
            throw new LogicException("That Reservation does not exists in the system");
            
        }
        let getps=await LGetPassengerService.getPSbyPassenger(this.passenger.idcard);
        if(getps===null)
        {
            throw new LogicException("That Passenger has not services");
            
        }
        this.reservation=getr;
        this.passengerservice=getps;
        this.totalrs=this.reservation.total+this.passengerservice.total;
        let datapay=this.getDTO();
        return datapay
    }
    close=async(ppassengeramount: number, datepayment: Date)=> {
        this.date=datepayment;
       
        this.passengeramount=ppassengeramount;
       return this.passengeramount-this.totalrs

    }
   constructor(pidpayment:number,ppassenger:LogicPassenger,preservation:LogicReservation,
    ppassengerservice:LogicPassengerService,ppassengeramount:number,ptotalrs:number,pdate:Date)
   {
       this.idpayment=pidpayment;
       this.passenger=ppassenger;
       this.reservation=preservation;
       this.passengerservice=ppassengerservice;
       this.passengeramount=ppassengeramount;
       this.totalrs=ptotalrs;
       this.date=pdate;
     
   }
}
