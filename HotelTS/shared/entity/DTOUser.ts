export  default class DTOUser
{
   idcard: string;
   name: string;
   surname: string;
   address: string;
   hashh: string;
   maill: string;
   phone: string;
   password: string;
   statee: string;
   typeuserr: string;


   
   constructor(pidcard:string,pname:string,psurname:string
    ,paddress:string,pphone:string,ptypeuser:string
    ,ppasswordd:string ,phash:string ,pmail:string ,pstate:string)
   {
       this.idcard=pidcard;
       this.name=pname;
       this.surname=psurname;
       this.address=paddress;
       this.phone=pphone;
       this.typeuserr=ptypeuser;
       this.password=ppasswordd;
       this.hashh=phash;
       this.maill=pmail;
       this.statee=pstate;
   }
      
}