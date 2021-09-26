import DTOService from "../../../shared/entity/DTOService";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LCUDService } from "../service_maintenance/maintenance/LCUDService";
import { LGetService } from "../service_maintenance/maintenance/LGetService";

export  default class LogicService
{
    private _idservice: number;
    private _name: string;
    private _value: number;
    private _statee: string;
   
    //GETTERS
    public get idservice(): number {
        return this._idservice;
    }
    public get name(): string {
        return this._name;
    }
    public get value(): number {
        return this._value;
    }
    public get state(): string {
        return this._statee;
    }

    //SETTERS
    public set idservice(value: number) {
        
        this._idservice = value;
    }
    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    public set value(value: number) {
        if (value<=0)
        {
            throw new LogicException("The value must be grater than 0");
        }
        this._value = value;
    }
    public set state(value: string) {
        this._statee = value;
    }
    
    register=async()=>
    {
     let servicesh = await LGetService.getLService(this.idservice);
     if (servicesh != null) {
        if(servicesh.state==="Active")
        {
          throw new LogicException("That Service already exists in the system");
        }
       else
        {
          const actservice=await LCUDService.changeStateService(servicesh.idservice,"Active");
          return actservice;
         
        }
    }
     const dto=this.getDTO();
     const regs=await LCUDService.registerService(dto);
     return regs
   }
   update=async()=>
   {
     
    let serviceh = await LGetService.getLService(this.idservice);
     if (serviceh === null) {
         throw new LogicException("That Service do not exists in the system");
     }
     if(serviceh.state==="Inactive")
     {
       throw new LogicException("That Service is inactive");
     } 
    const dto=this.getDTO();
    const upserv=await LCUDService.updateService(dto);
    return upserv
     
   }
   disable=async()=>
    {
     let serviceh = await LGetService.getLService(this.idservice);
     if (serviceh === null) {
         throw new LogicException("That Service do not exists in the system");
     }
     if(serviceh.state==="Inactive")
     {
       throw new LogicException("That Service is inactive");
     } 
       const dto=this.getDTO();
       const dels=await LCUDService.changeStateService(dto.idservice,"Inactive");
       return dels
    }
  
    getDTO=()=>
    {
        let dtserv=new DTOService(this.idservice,
            this.name,this.value,this.state);
        return dtserv
    }
   constructor(pidservice:number,pname:string,pvalue:number,pstate:string)
   {
       this.idservice=pidservice;
       this.name=pname;
       this.value=pvalue;
       this.state=pstate;
     
   }
      

}