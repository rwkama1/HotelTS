import DTOReservation from "../../../shared/entity/DTOReservation";
import DTOReservationDetail from "../../../shared/entity/DTOReservationDetail";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LGetPassenger } from "../passenger_maintenance/maintenace/LGetPassenger";
import LGetReservation from "../reservation_maintenance/maintenance/LGetReservation";
import { LGetRoom } from "../room_maintenance/maintenance/LGetRoom";
import LogicReservationDetail from "./LDetailReservation";
import LogicPassenger from "./LPassenger";
import LogicRoom from "./LRoom";

export  default class LogicReservation
{
    private _numberreservation: number;
    private _reservationdate: Date;
    private _arrivaldate: Date;
    private _departuredate: Date;
    private _processtatus: string;
    private _confirmationstatus: string;
    private _origin: string;
    private _total: number;
    private _passenger: LogicPassenger;
    private _listDetailReservation: LogicReservationDetail[];

    //GETTERS

    public get numberreservation(): number {
        return this._numberreservation;
    }
    public get reservationdate(): Date {
        return this._reservationdate;
    }
    public get arrivaldate(): Date {
        return this._arrivaldate;
    }
    public get departuredate(): Date {
        return this._departuredate;
    }
    public get processtatus(): string {
        return this._processtatus;
    }
    public get confirmationstatus(): string {
        return this._confirmationstatus;
    }
    public get origin(): string {
        return this._origin;
    }
    public get total(): number {
        return this._total;
    }
    public get passenger(): LogicPassenger {
        return this._passenger;
    }
    public get listDetailReservation(): LogicReservationDetail[] {
        return this._listDetailReservation;
    }

   //SETTERS
    public set numberreservation(value: number) {
        this._numberreservation = value;
    }
    public set reservationdate(value: Date) {
        if(value===null)
        {
            throw new LogicException("The Reservation Date is null");
            
        }
        this._reservationdate = value;
    }
    public set arrivaldate(value: Date) {
        if(value===null)
        {
            throw new LogicException("The Arrival Date is null");
            
        }
        this._arrivaldate = value;
    }
    public set departuredate(value: Date) {
        if(value===null)
        {
            throw new LogicException("The Departure Date is null");
            
        }
        this._departuredate = value;
    }
    public set processtatus(value: string) {
        if (value.trim()!="Pending" && value.trim()!="Confirmed" && value.trim()!="Canceled")
         {
           throw new LogicException("The Process Status can only be Pending, Confirmed, Canceled");
         }
        this._processtatus = value;
    }
    public set confirmationstatus(value: string) {
        if (value.trim()!="NotConfirmed" && value.trim()!="Confirmed")
         {
           throw new LogicException("The Confirmation Status can only be Not Confirmed or Confirmed");
         }
        this._confirmationstatus = value;
    }  
    public set origin(value: string) {
        if (value.trim()!="Hotel" && value.trim()!="Online")
         {
           throw new LogicException("The Confirmation Status can only be Hotel or Online");
         }
        this._origin = value;
    }
    public set total(value: number) {
        this._total = value;
    }
    public set passenger(value: LogicPassenger) {
       
        this._passenger = value;
    }
    public set listDetailReservation(value: LogicReservationDetail[]) {
        this._listDetailReservation = value;
    }
   
    enterPassenger=async(idcard:string)=>
    {
    
        const getPassenger=await LGetPassenger.getLPassenger(idcard);
      
        if(getPassenger===null)
        {  
            return false;
        }
        else
        {
         
            this.passenger=getPassenger;
            let lpassenger=this.passenger;
            return lpassenger
        }
    }
    registerReservationDetail=async(numberroom:number)=> {
        let lroom = await LGetRoom.getLRoom(numberroom);
        let lengharraydr=this.listDetailReservation.length;
        lengharraydr++;
        var detailr = new LogicReservationDetail(lengharraydr,lroom.value,lroom);
        var listdeatilreservation=this.listDetailReservation;
        listdeatilreservation.push(detailr);
        return detailr;
       
    }
    removeRD=async(numberroom:number)=> {
        let lroom = await LGetRoom.getLRoom(numberroom);   
        var listdetailr = this.listDetailReservation;
        for (var i =0; i < listdetailr.length; i++)
        {
            if (listdetailr[i].lroom.numberroom === lroom.numberroom) {
                listdetailr.splice(i,1);
                break;
            }
        }
    }
    close=async()=> {
       
        var listdetailr = this.listDetailReservation;
        var vtotal=0;
        for (let d of listdetailr) {
            vtotal += d.value
        }
       this.total=vtotal;    
    }
    save=async(dtreservation:DTOReservation)=>
    {
        for(let logicdr of this.listDetailReservation)
        {
            if(logicdr.lroom.statee==="Inactive")
            {
                throw new LogicException("A room in the reservation detail is inactive and cannot be reserved");
                
            }
        }
        this.reservationdate=dtreservation.reservationdate;
        this.arrivaldate=dtreservation.arrivaldate;
        this.departuredate=dtreservation.departuredate;
       
        let havereservrdetails=this.haveDetailR();
        if(havereservrdetails)
          {
           
            let dtoreservation=this.getDTO();
            return dtoreservation;
          }
        else
          {
            throw new LogicException("The Detail Reservations has no items");
          }
    }
    haveDetailR() {
        var listdetailr = this.listDetailReservation;
        var haveDR = listdetailr.length > 0;
        return haveDR;
    }
    getDTO=()=>
    {
        let arraydetailreservation=[];
        for(let logicdetailr of this.listDetailReservation)
        {
          
            let dtodetailr=new DTOReservationDetail(logicdetailr.numberrd,
                logicdetailr.value,logicdetailr.lroom.numberroom);
                arraydetailreservation.push(dtodetailr);
        }
        let dtoreservation=new DTOReservation(this.numberreservation,this.reservationdate,
            this.arrivaldate,this.departuredate,this.processtatus,
            this.confirmationstatus,this.origin,this.total,
            this.passenger.idcard,arraydetailreservation);
            return dtoreservation
    }

    constructor(pnumberreservation:number,preservationdate:Date,
        parrivaldate:Date,pdeparturedate:Date,pprocesstatus:string,
        pconfirmationstatus:string,porigin:string,ptotal:number,
        ppassenger:LogicPassenger,plistDetailReservation:LogicReservationDetail[] )
       {
           this.numberreservation=pnumberreservation;
           this.reservationdate=preservationdate;
           this.arrivaldate=parrivaldate;
           this.departuredate=pdeparturedate;
           this.processtatus=pprocesstatus;
           this.confirmationstatus=pconfirmationstatus;
           this.origin=porigin;
           this.total=ptotal;
           this.passenger=ppassenger;
           this.listDetailReservation=plistDetailReservation;
       }

}