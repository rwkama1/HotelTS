import DTODPassengerService from "../../../shared/entity/DTODPassengerService";
import LogicService from "./LService";

export  default class LogicDPassengerService
{
    private _numberdetailps: number;
    private _service: LogicService;
    private _amount: number;

  //GETTERS

    public get numberdetailps(): number {
        return this._numberdetailps;
    }
    public get service(): LogicService {
        return this._service;
    }
    public get amount(): number {
        return this._amount;
    }
    
    //SETTERS

    public set numberdetailps(value: number) {
        this._numberdetailps = value;
    }
    public set service(value: LogicService) {
        this._service = value;
    }
    public set amount(value: number) {
        this._amount = value;
    }
    getDTO=()=>
    { 
        let dtodps=new DTODPassengerService(this.numberdetailps,this.service.idservice,this.amount);
        return dtodps    
    }

   constructor(pnumberdps:number,pservice:LogicService,pamount:number)
   {
       this.numberdetailps=pnumberdps;
       this.service=pservice;
       this.amount=pamount;
       
   }
}