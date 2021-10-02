import DTODPassengerService from "../../../shared/entity/DTODPassengerService";
import DTOPassengerService from "../../../shared/entity/DTOPassengerService";
import { LogicException } from "../../../shared/exceptions/logicexception";
import LGetPassengerService from "../passenger_service_maintenance/maintenance/LGetPassengerServices";

import { LGetService } from "../service_maintenance/maintenance/LGetService";
import LogicDPassengerService from "./LDPassengerService";
import LogicPassenger from "./LPassenger";

export  default class LogicPassengerService
{
    private _numberps: number;
    private _passenger: LogicPassenger;
    private _startdate: Date;
    private _enddate: Date;
    private _total: number;
    private _observations: string;
    private _listdetailps: LogicDPassengerService[];

  //GETTERS
    public get numberps(): number {
        return this._numberps;
    }
    public get passenger(): LogicPassenger {
        return this._passenger;
    }
    public get startdate(): Date {
        return this._startdate;
    }
    public get total(): number {
        return this._total;
    }
    public get enddate(): Date {
        return this._enddate;
    }
    public get observations(): string {
        return this._observations;
    }  
    public get listdetailps(): LogicDPassengerService[] {
        return this._listdetailps;
    }

  //SETTERS
    public set numberps(value: number) {
        this._numberps = value;
    }
    public set passenger(value: LogicPassenger) {
        this._passenger = value;
    }

    public set startdate(value: Date) {
        if(value===null)
        {
            throw new LogicException("The Start Date is null");
            
        }
        this._startdate = value;
    }
    public set enddate(value: Date) {
        if(value===null)
        {
            throw new LogicException("The End Date is null");
            
        }
        this._enddate = value;
    }
    public set total(value: number) {
        this._total = value;
    } 
    public set observations(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The Observation cannot be empty");
        }
        this._observations = value;
    }
    public set listdetailps(value: LogicDPassengerService[]) {
        this._listdetailps = value;
    }
    registerDetailPS=async(ids:number)=> {
        let lservice = await LGetService.getLService(ids);
        let lengharraydr=this.listdetailps.length;
        lengharraydr++;
        let detailr = new LogicDPassengerService(lengharraydr,lservice,lservice.value);
        let listdps=this.listdetailps;
        listdps.push(detailr);
        return detailr;      
    }
    removeDetailPS=async(ids:number)=> {
        let lservice = await LGetService.getLService(ids);   
        var listdetailr = this.listdetailps;
        for (var i =0; i < listdetailr.length; i++)
        {
            if (listdetailr[i].service.idservice === lservice.idservice) {
                listdetailr.splice(i,1);
                break;
            }
        }
    }
    close=async()=> {
        let getsps=await LGetPassengerService.getListPS();
        let listdetailr = this.listdetailps;
        let vtotal=0;
        for (let d of listdetailr) {
            vtotal += d.amount
        }
        this.total=vtotal;
           
        let lengthservices=getsps.arrayps.length;
        this.numberps=lengthservices;
        let data=this.getDTO();
        return data
         
    }
    getDTO=()=>
    {
        let arraydtodps=[];
        
        for(let logicdps of this.listdetailps)
        {
           
            let dtodps=new DTODPassengerService(logicdps.numberdetailps,logicdps.service.idservice,logicdps.amount);
            arraydtodps.push(dtodps);
        }
        let dtops=new DTOPassengerService(
            this.numberps,this.passenger.idcard,this.startdate,this.enddate,this.total,this.observations,arraydtodps);
            return dtops
    }

   constructor(pnumberps:number,ppassenger:LogicPassenger,pstartdate:Date,penddate:Date,
    ptotal:number,pobservations:string,plistdetailps:LogicDPassengerService[])
   {
       this.numberps=pnumberps;
       this.passenger=ppassenger;
       this.startdate=pstartdate;
       this.enddate=penddate;
       this.total=ptotal;
       this.observations=pobservations;
       this.listdetailps=plistdetailps;
   }
}