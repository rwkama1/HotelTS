export  default class DTORoom
{
    numberroom: number;
    typeroom: string;
    typebed: string;
    acommodation: string;
    description: string;
    value: number;
    image: string;
    statee: string;
   
   constructor(pnumberroom:number,ptyperoom:string,ptypebed:string,
    pacommodation:string,pdescription:string,pvalue:number,pstatee:string,
    pimage:string
    )
   {
       this.numberroom=pnumberroom;
       this.typeroom=ptyperoom;
       this.typebed=ptypebed;
       this.acommodation=pacommodation;
       this.description=pdescription;
       this.value=pvalue;
       this.image=pimage;
       this.statee=pstatee;
   }
  
      
}