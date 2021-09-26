export  default class DTOPassenger
{
    idcard: string;
    name: string;
    surname: string;
    country: string;
    town: string;
    address: string;
    phone: string;
    maill: string;
    salt: string;
    password: string;
    statee: string;
    
      
   constructor(pidcard:string,pname:string,psurname:string
    ,pcountry:string,ptown:string,paddress:string
    ,pphone:string ,ppmail:string ,psalt:string ,ppassword:string,pstate:string)
   {
       this.idcard=pidcard;
       this.name=pname;
       this.surname=psurname;
       this.country=pcountry;
       this.town=ptown;
       this.address=paddress;
       this.phone=pphone;
       this.maill=ppmail;
       this.salt=psalt;
       this.password=ppassword;
       this.statee=pstate;
   }
}
