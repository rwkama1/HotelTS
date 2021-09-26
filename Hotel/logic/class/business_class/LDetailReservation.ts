import { LogicException } from "../../../shared/exceptions/logicexception";
import LogicRoom from "./LRoom";

export  default class LogicReservationDetail
{
    private _numberrd: number;
    private _value: number;
    private _lroom: LogicRoom;

   //GETTERS
    public get numberrd(): number {
        return this._numberrd;
    }
    
    public get value(): number {
        return this._value;
    }
    public get lroom(): LogicRoom {
      
        return this._lroom;
    }
    //SETTERS
    public set numberrd(value: number) {
        this._numberrd = value;
    }
    public set value(value: number) {
        if(value<=0)
        {
            throw new LogicException("The Value must be greater than 0");
            
        }
        this._value = value;
    }
    public set lroom(value: LogicRoom) {
        if(value===null)
        {
            throw new LogicException("The Room is null");
            
        }
        this._lroom = value;
    }

   constructor(pnumberrd:number,pvalue:number,
    plroom:LogicRoom)
   {
       this.numberrd=pnumberrd;
       this.value=pvalue;
       this.lroom=plroom;    
   }
}