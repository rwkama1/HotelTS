const { VarChar,Int, Money } = require("mssql");
const { DTORoom } = require("../DTO/DTORoom");

const { Conection } = require("./Conection");

class DataRoom
{
    //#region CRUD

    static registerRoom=async(dtoroom)=>
    {
          let queryinsert = `  

            insert into Room values (@Typee,@Typebed,
            @Accommodation,@Descriptionn,@Value,'Active',@Squaremeter,@Imagee)
              
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('Typee', VarChar, dtoroom.Typee)
          .input('Typebed', VarChar, dtoroom.Typebed)
          .input('Accommodation', VarChar, dtoroom.Accommodation)
          .input('Descriptionn',VarChar, dtoroom.Descriptionn)
          .input('Value', Money, dtoroom.Value)
          .input('Imagee', VarChar, dtoroom.Imagee)
          .input('Squaremeter', Int, dtoroom.Squaremeter)
          .query(queryinsert)
          pool.close();
          return true;
  
    }
    static updateRoom=async(dtoroom)=>
    {
      let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Room WHERE NumberRoomm=@NumberRoomm and Statee='Active')
          BEGIN
            select -1 as notexistroom
          END
          ELSE
          BEGIN
            Update Room Set Typee=@Typee,Typebed=@Typebed,
            Accommodation=@Accommodation,
            Descriptionn=@Descriptionn,Value=@Value,
            Imagee=@Imagee where NumberRoomm=@NumberRoomm
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberRoomm', Int, dtoroom.NumberRoomm)
          .input('Typee', VarChar, dtoroom.Typee)
          .input('Typebed', VarChar, dtoroom.Typebed)
          .input('Accommodation', VarChar, dtoroom.Accommodation)
          .input('Descriptionn',VarChar, dtoroom.Descriptionn)
          .input('Value', Money, dtoroom.Value)
          .input('Imagee', VarChar, dtoroom.Imagee)
          .input('Squaremeter', Int, dtoroom.Squaremeter)
      
          .query(queryupdate)
          resultquery = result.recordset[0].notexistroom;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static inactiveRoom=async(numberroom)=>
    {
          let resultquery;
          let queryupdate =`

          IF NOT EXISTS ( SELECT * FROM Room WHERE NumberRoomm=@NumberRoomm and Statee='Active')
          BEGIN
            select -1 as notexistroom
          END
          ELSE
          BEGIN
            Update Room Set Statee='Inactive'
            where NumberRoomm=@NumberRoomm
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();  
          const result = await pool.request()
          .input('NumberRoomm', Int,numberroom)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistroom;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
  
    }
    
    //#endregion

    //#region GETS

    static getRoom=async(numberoom)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Room WHERE NumberRoomm=@NumberRoomm and Statee='Active')
            BEGIN
              select -1 as notexistroom
            END
            ELSE
            BEGIN
                SELECT * FROM Room
                WHERE NumberRoomm=@NumberRoomm and Statee='Active'
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('NumberRoomm', Int, numberoom)
             .query(querysearch)
            resultquery = result.recordset[0].notexistroom; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let room = new DTORoom();
              this.getinformation(room, resultrecordset);
              resultquery=room
            }
           pool.close();
           return resultquery;
      
    
     }

     static getRooms=async(orderby="NumberRoomm")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Room WHERE Statee='Active'
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
              let room = new DTORoom();
              this.getinformation(room,  r);
              array.push(room);
            } 
           pool.close();
           return array;
      
    
     }

     static getSearchRoom=async(type="",typebed="",accommodation="",
     value1=0,value2=99999, squarem1=0,squarem2=99999,orderby="NumberRoomm")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Room WHERE Statee='Active'
                AND  Typee LIKE '%${type}%' 
                AND Typebed LIKE '%${typebed}%' 
                AND Accommodation LIKE '%${accommodation}%' 
                AND Squaremeter BETWEEN ${squarem1}  AND ${squarem2}
                AND Value BETWEEN ${value1} AND ${value2} 
                ORDER BY ${orderby} desc
             `

             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
                let room = new DTORoom();
                this.getinformation(room,  r);
                array.push(room);
             } 
            pool.close();
            return array;
       
     
      }

     static getRoomsMultipleNumbers=async(arrayroom,orderby="NumberRoomm")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Room WHERE Statee='Active'
               AND numberroomm in (
                ${
                  this.forinsidestring(arrayroom)
                }
                )
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
              let room = new DTORoom();
              this.getinformation(room,  r);
              array.push(room);
            } 
           pool.close();
           return array;
      
    
     }

    
    

    //#endregion

   //#region GET INFORMATION

   static getinformation(room, result) {

    room.NumberRoomm = result.NumberRoomm;
    room.Typee = result.Typee;
    room.Typebed = result.Typebed;
    room.Accommodation = result.Accommodation;
    room.Descriptionn = result.Descriptionn; 
    room.Value = result.Value;
    room.Statee = result.Statee; 
    room.Imagee = result.Imagee;
    room.Squaremeter = result.Squaremeter; 
    
   }

   static forinsidestring(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (index===array.length-1) {
        stringelement=stringelement+element
      }
      else
      {
        stringelement=stringelement+element+","
      }
     
    }
    return stringelement
   
   }
   //#endregion
}
module.exports = { DataRoom };