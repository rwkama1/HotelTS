import DTOUser from "../../../shared/entity/DTOUser";
import { LogicException } from "../../../shared/exceptions/logicexception";
import HashPassword from "../encrypt/hashPassword";
import { LCRUDUser } from "../user_maintenace/maintenace/LCUDUsers";
import { LGetUsers } from "../user_maintenace/maintenace/LGetUsers";

export  default class LogicUser
{
   private _idcard: string;
   private _name: string;
   private _surname: string;
   private _address: string;
   private _hashh: string;
   private _maill: string;
   private _phone: string;
   private _password: string;
   private _statee: string;
   private _typeuserr: string;
   //GETTERS
    public get idcard(): string {
        return this._idcard;
    }
    public get name(): string {
        return this._name;
    }
    public get surname(): string {
        return this._surname;
    }
    public get address(): string {
        return this._address;
    }
    public get hashh(): string {
        return this._hashh;
    }
    public get maill(): string {
        return this._maill;
    }
    public get password(): string {
        return this._password;
    }
    public get phone(): string {
        return this._phone;
    }
    public get statee(): string {
        return this._statee;
    }
    public get typeuserr(): string {
        return this._typeuserr;
    }
    //SETTERS
    public set idcard(value: string) {
        var numbers = /^[0-9]+$/;
        if (!value.trim().match(numbers)) {
              throw new LogicException("The identity card must have only numbers");
                }
        if (value.trim() === "") {
              throw new LogicException("The identity card cannot be empty");
               }
         this._idcard = value;  
     }
    public set name(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    public set surname(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The surname cannot be empty");
        }
        this._surname = value;
    }
    public set address(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The address cannot be empty");
        }
        this._address = value;
    }  
    public set hashh(value: string) {
        this._hashh = value;
    }
    public set maill(value: string) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat))
         {
         throw new LogicException("The email is not valid");
         }
        this._maill = value;
    }
    public set phone(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The phone cannot be empty");
        }
        this._phone = value;
    } 
    public set password(value: string) {
       
        this._password = value;
    }
    public set statee(value: string) {
        this._statee = value;
    }
    public set typeuserr(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The typeuser cannot be empty");
        }
      if (value.trim()!="Administrator" && value.trim()!="Receptionist")
        {
            throw new LogicException("The user can only be of the type Administrator or Receptionist");
        }
        this._typeuserr = value;
    }
    //******************************************************* */
  
    private validatePassword=()=>
    {
         let pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
         if (!this.password.match(pass))       
         {
          throw new LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
         } 
    }
    //******************************************************* */
    register=async()=>
       {
       this.validatePassword();
        let usersearch = await LGetUsers.getLUser(this.idcard);
        if (usersearch != null) {
          if(usersearch.statee==="Active")
          {
            throw new LogicException("That User already exists in the system");
          }
         else
          {
          
            const actuser=await LCRUDUser.changestateUser(usersearch.idcard,"Active");
            return actuser;
           
          }
        }
        const passh=await HashPassword.hashPassword(this.password);
        this.password=passh.hash;
        this.hashh=passh.salt;
        const dto=this.getDTO();
        const reguser=await LCRUDUser.registerUser(dto);
        return reguser
      }
       
      update=async()=>
      {
        this.validatePassword();
        let usersearch = await LGetUsers.getLUser(this.idcard);
        if (usersearch === null) {
            throw new LogicException("That User do not exists in the system");
        }
        if(usersearch.statee==="Inactive")
        {
          throw new LogicException("That User is inactive");
        }
        const passh=await HashPassword.hashPassword(this.password);
        this.password=passh.hash;
        this.hashh=passh.salt;
       const dto=this.getDTO();
       const updateuser=await LCRUDUser.updateUser(dto);
       return updateuser
        
      }
      disable=async()=>
      {
        this.validatePassword();
        let usersearch = await LGetUsers.getLUser(this.idcard);
        if (usersearch === null) {
            throw new LogicException("That User do not exists in the system");
        }
        if(usersearch.statee==="Inactive")
        {
          throw new LogicException("That User is inactive");
        }
       const dto=this.getDTO();
       const deluser=await LCRUDUser.changestateUser(dto.idcard,"Inactive");
       return deluser
      }
      login=async(pass:string)=>
      {  
       const verifyp=await HashPassword.verifyPassword(pass,this.password,this.hashh);
   
       if(verifyp===false)
       {
           throw new LogicException("Wrong password");
       }
      }
      getDTO=()=>
       {
         let dtouser=new DTOUser(this.idcard,
          this.name,this.surname,this.address,this.phone,
          this.typeuserr,this.password,this.hashh,this.maill,
          this.statee);
          return dtouser
       }
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