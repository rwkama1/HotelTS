import DTOPassenger from "../../../shared/entity/DTOPassenger";
import { LogicException } from "../../../shared/exceptions/logicexception";
import HashPassword from "../encrypt/hashPassword";
import { LCUDPassenger } from "../passenger_maintenance/maintenace/LCUDPassenger";
import { LGetPassenger } from "../passenger_maintenance/maintenace/LGetPassenger";


export  default class LogicPassenger
{
    private _idcard: string;
    private _name: string;
    private _surname: string;
    private _country: string;
    private _town: string;
    private _address: string;
    private _phone: string;
    private _maill: string;
    private _statee: string;
    private _salt: string;
    private _password: string;

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
    public get country(): string {
        return this._country;
    }
    public get town(): string {
        return this._town;
    }
    public get address(): string {
        return this._address;
    }
    public get phone(): string {
        return this._phone;
    }
    public get maill(): string {
        return this._maill;
    }
    public get salt(): string {
        return this._salt;
    }
    public get password(): string {
        return this._password;
    }
    public get statee(): string {
        return this._statee;
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
    public set country(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The country cannot be empty");
        }
        this._country = value;

    }
    public set town(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The town cannot be empty");
        }
        this._town = value;
    }
    public set address(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The address cannot be empty");
        }
        this._address = value;
    }
    public set phone(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The phone cannot be empty");
        }
        this._phone = value;
    }
    public set maill(value: string) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.trim().match(mailformat))
         {
         throw new LogicException("The email is not valid");
         }
        this._maill = value;
    }
    public set salt(value: string) {
        this._salt = value;
    }
    public set password(value: string) {
        this._password = value;
    }
    public set statee(value: string) {
        this._statee = value;
    }
    public validatePassword=()=>
    {
         let pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
         if (!this.password.match(pass))       
         {
          throw new LogicException("The password must be at least 10 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number");
         } 
    }
 
 
    login=async(pass:string)=>
      {
       const verifyp=await HashPassword.verifyPassword(pass,this.password,this.salt);
   
       if(verifyp===false)
       {
           throw new LogicException("Wrong password");
       }
      }
   getDTO=()=>
   {
     let dtpassenger=new DTOPassenger(this.idcard,
        this.name,this.surname,this.country,this.town,
        this.address,this.phone,this.maill,this.salt,this.password,
        this.statee);
      return dtpassenger
   }
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