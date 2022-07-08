const { VarChar,Int } = require("mssql");
const { DTOPassenger } = require("../DTO/DTOPassenger");
const { Conection } = require("./Conection");

class DataPassenger
{
    //#region CRUD

    static registerPassenger=async(dtopassenger)=>
    {
      let resultquery;
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
    static updatePassenger=async(dtopassenger)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
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
    static updatePasswordPassenger=async(idcard,password,salt)=>
    {
           let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistpassenger
          END
          ELSE
          BEGIN
            Update Passenger 
            Set Salt=@Salt,Passwordd=@Passwordd where IDCard=@IDCard
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, idcard)
          .input('Salt', VarChar, salt)
          .input('Passwordd', VarChar, password)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static inactivePassenger=async(idcard)=>
    {
          let resultquery;
          let queryupdate =`

          IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistpassenger
          END
          ELSE
          BEGIN
            Update Passenger Set Statee='Inactive' where IDCard=@IDCard
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();  
          const result = await pool.request()
          .input('IDCard', VarChar,idcard)
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

    //#region GETS

    static getPassenger=async(idcard)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
            BEGIN
              select -1 as notexistpassenger
            END
            ELSE
            BEGIN
               SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active'
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCard', VarChar, idcard)
             .query(querysearch)
              resultquery = result.recordset[0].notexistpassenger; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let passenger = new DTOPassenger();
              this.getinformation(passenger, resultrecordset);
              resultquery=passenger
            }
           pool.close();
           return resultquery;
      
    
     }

     static getPassengers=async(orderby="idcard")=>
    {
            let array=[];
            let querysearch = `

               SELECT * FROM Passenger WHERE Statee='Active'
               ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var p of result.recordset) {
              let passenger = new DTOPassenger();
              this.getinformation(passenger, p);
              array.push(passenger);
            } 
           pool.close();
           return array;
      
    
     }

     static getSearchPassengers=async(name="",lastname="",country="",town="",address="",phone="",mail=""
     ,orderby="idcard")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Passenger WHERE Statee='Active'
                AND  Names LIKE '%${name}%' 
                AND LastName LIKE '%${lastname}%' 
                AND Country LIKE '%${country}%' 
                AND Town LIKE '%${town}%' 
                AND Addresss LIKE '%${address}%' 
                AND PhoneNumber LIKE '%${phone}%' 
                AND Mail LIKE '%${mail}%' 
                ORDER BY ${orderby} desc
             `

           
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var p of result.recordset) {
               let passenger = new DTOPassenger();
               this.getinformation(passenger, p);
               array.push(passenger);
             } 
            pool.close();
            return array;
       
     
      }

    //#endregion

   //#region GET INFORMATION

   static getinformation(passenger, result) {

    passenger.idcard = result.IDCard;
    passenger.name = result.Names;
    passenger.surname = result.LastName;
    passenger.country = result.Country;
    passenger.town = result.Town; 
    passenger.address = result.Addresss;
    passenger.phone = result.PhoneNumber; 
    passenger.maill = result.Mail;
    passenger.salt = result.Salt; 
    passenger.password = result.Passwordd;
    passenger.statee = result.Statee; 

   }

   //#endregion
}
module.exports = { DataPassenger };