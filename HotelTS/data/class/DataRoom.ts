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
    //#region CUD
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
    //#endregion
 
    //#region SEARCH

    getRoombyID=async(number)=>
    {
    let pool = await Conection.conection();
    var dtoroom=null;
    try {
        let queryget = `select * from Room where numberroomm=@numberroomm`;
        
        
        const result = await pool.request()
        .input('numberroomm',Int, number)
        .query(queryget)
         dtoroom = new DTORoom(result.recordset[0].NumberRoomm,
            result.recordset[0].Typee,result.recordset[0].Typebed,
            result.recordset[0].Accommodation,result.recordset[0].Descriptionn,
            result.recordset[0].Value,result.recordset[0].Statee,
            result.recordset[0].Imagee)
        return dtoroom
        
    }
    catch(e)
    {
        return dtoroom
    }
    finally
    {
    pool.close();
    }
    }
    getRoomSearch=async(number1,number2,type,typebed,value1,value2)=>
    {
    try {
        let queryget=`SELECT *
        FROM room
        WHERE  numberroomm between ${number1} and ${number2}
         AND typee LIKE '%${type}%'
        AND typebed LIKE '%${typebed}%'
        and value ${value1} and ${value2}
         AND statee='Active'`;
        
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)


        for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
               
            arrayu.push(room);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("A error occurred related to the room database:"+e.message)
    }
    }

    //#endregion

    //#region LISTS

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
          throw new DataException("A error occurred related to the room database: "+e.message)
      }
     }
     getRoomsActive=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active'";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:"+e.message)
     }
     }
     getRoomsInactive=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Inactive'";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
             }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:"+e.message)
     }
     }
     SortbyNumberRoomDesc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by numberroomm desc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
             }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:"+e.message)
     }
     }
     SortbyTypeAsc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by typee asc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
     SortbyTypeDesc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by typee desc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
     SortbyTypeBedAsc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by typebed asc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
     SortbyTypeBedDesc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by typebed desc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
     SortbyValueAsc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by value asc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
     SortbyValueDesc=async()=>
     {
     try {
         let queryget = "select * from Room where Statee='Active' order by value desc";
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
        
         for (let x of result.recordset) {
            let room = new DTORoom(x.NumberRoomm,
                x.Typee,x.Typebed,
                x.Accommodation,x.Descriptionn,
                x.Value,x.Statee,
                x.Imagee);
             arrayu.push(room);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the room database:   "+e.message)
     }
     }
    

    //#endregion
   
}
