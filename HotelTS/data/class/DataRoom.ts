import { Int, Money, VarChar } from "mssql";
import DTORoom from "../../shared/entity/DTORoom";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataRoom from "../interfaces/IDataRoom";

export default class DataRoom implements IDataRoom 
{
     
    private static instancia: DataRoom;
    private constructor() { }
    public static getInstance(): DataRoom {
        if (!DataRoom.instancia) {
            DataRoom.instancia = new DataRoom();
        }

        return DataRoom.instancia;
    }
    registerRoom=async(dtoroom:DTORoom)=>
    {
      try {
          let queryinsert = "insert into Room values (@Typee,@Typebed,@Accommodation,@Descriptionn,@Value,'Active',@Imagee)";
          let pool = await Conection.conection();
          const result = await pool.request()
      
          .input('Typee', VarChar, dtoroom.typeroom)
          .input('Typebed', VarChar, dtoroom.typebed)
          .input('Accommodation', VarChar, dtoroom.acommodation)
          .input('Descriptionn',VarChar, dtoroom.description)
          .input('Value', Money, dtoroom.value)
          .input('Imagee', VarChar, dtoroom.image)
          .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateRoom=async(dtoroom:DTORoom)=>
    {
        try {
            let queryupdate = "Update Room Set Typee=@Typee,Typebed=@Typebed,Accommodation=@Accommodation,Descriptionn=@Descriptionn,Value=@Value,Imagee=@Imagee where NumberRoomm=@NumberRoomm";
            let pool = await Conection.conection();
           
            const result = await pool.request()
            .input('NumberRoomm', Int, dtoroom.numberroom)
            .input('Typee', VarChar, dtoroom.typeroom)
            .input('Typebed', VarChar, dtoroom.typebed)
            .input('Accommodation', VarChar, dtoroom.acommodation)
            .input('Descriptionn',VarChar, dtoroom.description)
            .input('Value', Money, dtoroom.value)
            .input('Imagee', VarChar, dtoroom.image)
             .query(queryupdate)
               
           
            pool.close();
            return true;
           
        }
        catch(e)
        {
            throw new DataException("DataLayer Error: "+e.message)
        }
  
    }
    changeStateRoom=async(numberroom:number,state:string)=>
    {
      try {
          let queryupdate = "Update Room Set Statee=@Statee where NumberRoomm=@NumberRoomm";
          let pool = await Conection.conection();
         
          const result = await pool.request()
              .input('NumberRoomm', Int,numberroom)
              .input('Statee', VarChar, state)
              .query(queryupdate)     
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    getRooms=async()=>
    {
      try {
          let queryget = "select * from Room"
          let pool = await Conection.conection();
          let arrayrooms=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let room = new DTORoom(x.NumberRoomm,
                 x.Typee,x.Typebed,
                 x.Accommodation,x.Descriptionn,
                 x.Value,x.Statee,
                 x.Imagee);
                 arrayrooms.push(room);
           }
          pool.close();
          return arrayrooms;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}
