import DTORoom from "../../../shared/entity/DTORoom";
import { LogicException } from "../../../shared/exceptions/logicexception";
import { LCUDRoom } from "../room_maintenance/maintenance/LCUDRoom";
import { LGetRoom } from "../room_maintenance/maintenance/LGetRoom";

export  default class LogicRoom
{
    private _numberroom: number;
    private _typeroom: string;
    private _acommodation: string;
    private _description: string;
    private _value: number;
    private _typebed: string;
    private _statee: string;
    private _image: string;

    //GETTERS
    public get numberroom(): number {
        return this._numberroom;
    }
    public get typeroom(): string {
        return this._typeroom;
    }
    public get typebed(): string {
        return this._typebed;
    }
    public get acommodation(): string {
        return this._acommodation;
    }
    public get description(): string {
        return this._description;
    }
    public get value(): number {
        return this._value;
    }
    public get image(): string {
        return this._image;
    }
    public get statee(): string {
        return this._statee;
    }

    //SETTERS
    public set numberroom(value: number) {
        
        this._numberroom = value;
    }
    public set typeroom(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The typeroom cannot be empty");
        }
        this._typeroom = value;
    }
    public set typebed(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The typebed cannot be empty");
        }
        this._typebed = value;
    }
     public set acommodation(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The acommodation cannot be empty");
        }
        this._acommodation = value;
    }
    public set description(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The description cannot be empty");
        }
        this._description = value;
    }
    public set value(value: number) {
        if (value<=0)
        {
            throw new LogicException("The value must be grater than 0");
        }
        this._value = value;
    }
    public set image(value: string) {
        if (!(value.trim().match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)))
        {
            throw new LogicException("Only images files are allowed");
        }
        this._image = value;
    }
    public set statee(value: string) {
        if (value.trim() === "")
        {
            throw new LogicException("The state cannot be empty");
        }
        this._statee = value;
    }
    
    register=async()=>
    {
    //  let roomsh = await LGetRoom.getLRoom(this.numberroom);
    //  if (roomsh != null) {
    //    if(roomsh.statee==="Active")
    //    {
    //      throw new LogicException("That Room already exists in the system");
    //    }
    //   else
    //    {
    //      const actroom=await LCUDRoom.changeStateRoom(roomsh.numberroom,"Active");
    //      return actroom;
        
    //    }
    //  }   
    //  const dto=this.getDTO();
    //  const regroom=await LCUDRoom.registerRoom(dto);
    //  return regroom
   }
   update=async()=>
   {
     
    // let roomsh = await LGetRoom.getLRoom(this.numberroom);
    //  if (roomsh === null) {
    //      throw new LogicException("That Room do not exists in the system");
    //  }
    // if(roomsh.statee==="Inactive")
    //  {
    //    throw new LogicException("That Room is inactive");
    //  } 
    // const dto=this.getDTO();
    // const updateroom=await LCUDRoom.updateRoom(dto);
    // return updateroom
     
   }
   disable=async()=>
    {
    //     let roomsh = await LGetRoom.getLRoom(this.numberroom);
    //     if (roomsh === null) {
    //         throw new LogicException("That Room do not exists in the system");
    //     }
    //     if(roomsh.statee==="Inactive")
    //     {
    //       throw new LogicException("That Room is inactive");
    //     }
    //    const dto=this.getDTO();
    //    const delroom=await LCUDRoom.changeStateRoom(dto.numberroom,"Inactive");
    //    return delroom
    }
    getDTO=()=>
    {
        let dtroom=new DTORoom(this.numberroom,
            this.typeroom,this.typebed,
            this.acommodation,this.description,
            this.value,this.statee,this.image);
        return dtroom
    }
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