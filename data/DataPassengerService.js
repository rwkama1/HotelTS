const { VarChar,Int, Money } = require("mssql");


const { Conection } = require("./Conection");

class DataPassengerService
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

    static getMultiplePassengerServices=async(arrayservices,orderby="numberps")=>
    {
            let array=[];
             let querysearch =
             `
                 SELECT 
                    *, 
                    (
                    select 
                        SUM(value) as total 
                    from 
                        servicee 
                    where 
                        statee = 'Active' and 
                        idservice in (
                            ${
                             this.forinsidestring(arrayservices)
                             }
                        ) 
                    
                    ) as Total 
                    FROM 
                    servicee 
                    WHERE 
                    idservice IN 
                    (
                     ${
                      this.forinsidestring(arrayservices)
                     }
                    ) 
                    AND  statee = 'Active'
                    ORDER BY ${orderby} desc
              
             `

            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
              let detailreservation = new DTOReservationDetail();
              this.getinformationDetailReservationTotal(detailreservation,r);
              array.push(detailreservation);
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
module.exports = { DataPassengerService };