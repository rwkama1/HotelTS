export  default class DTOService
{
    idservice: number;
    name: string;
    value: number;
    statee: string;
  
   constructor(pidservice:number,pname:string,pvalue:number,pstate:string)
   {
       this.idservice=pidservice;
       this.name=pname;
       this.value=pvalue;
       this.statee=pstate;
   }
      
}