
const { VarChar,Int } = require("mssql");
const { Conection } = require("./Conection");

class DataPassenger
{
    //#region CRUD

    static registerPassenger=async(dtopassenger)=>
    {
   
          let queryinsert = `

          IF  EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as existpassenger
          END
          ELSE
          BEGIN
            insert into Passenger values 
            (@IDCard,@Names,@LastName,
            @Country,@Town,@Addresss,
            @PhoneNumber,@Mail,@Salt,@Passwordd,'Active')
            select 1 as insertsuccess
          END 
        
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, dtopassenger.idcard)
          .input('Names', VarChar, dtopassenger.name)
          .input('LastName', VarChar, dtopassenger.surname)
          .input('Country', VarChar, dtopassenger.country)
          .input('Town',VarChar, dtopassenger.town)
          .input('Addresss', VarChar, dtopassenger.address)
          .input('PhoneNumber', VarChar, dtopassenger.phone)
          .input('Mail', VarChar, dtopassenger.maill)
          .input('Salt', VarChar, dtopassenger.salt)
          .input('Passwordd', VarChar, dtopassenger.password)
          .query(queryinsert)
          resultquery = result.recordset[0].existpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return resultquery;
  
    }

    updatePassenger=async(dtopassenger)=>
    {
      
          let queryupdate = `

          IF  NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistpassenger
          END
          ELSE
          BEGIN
            Update Passenger 
            Set Names=@Names,LastName=@LastName,Country=@Country,Town=@Town,Addresss=@Addresss,PhoneNumber=@PhoneNumber,Mail=@Mail where IDCard=@IDCard
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDCard', VarChar, dtopassenger.idcard)
          .input('Names', VarChar, dtopassenger.name)
          .input('LastName', VarChar, dtopassenger.surname)
          .input('Country', VarChar, dtopassenger.country)
          .input('Town',VarChar, dtopassenger.town)
          .input('Addresss', VarChar, dtopassenger.address)
          .input('PhoneNumber', VarChar, dtopassenger.phone)
          .input('Mail', VarChar, dtopassenger.maill)
          // .input('Salt', VarChar, dtopassenger.salt)
          // .input('Passwordd', VarChar, dtopassenger.password)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }

    //#endregion
}
module.exports = { DataPassenger };