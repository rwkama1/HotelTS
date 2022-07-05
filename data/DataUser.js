
const { VarChar } = require("mssql");
const { DTOUser } = require("../DTO/DTOUser");
const { Conection } = require("./Conection");

class DataUser
{
    //#region CRUD

    static registerUser=async(dtouser)=>
    {
         let resultquery;
          let queryinsert = `

          IF  EXISTS ( SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as existuser
          END
          ELSE
          BEGIN
           insert into Users values (@IDCard,@NamesUser,@LastName,@Addresss,@PhoneNumber,@TypeUser,@Hashh,'Active',@PasswordUser,@Mail)
           select 1 as insertsuccess
          END 
        
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, dtouser.IDCard)
          .input('NamesUser', VarChar, dtouser.NamesUser)
          .input('LastName', VarChar, dtouser.LastName)
          .input('Addresss', VarChar, dtouser.Addresss)
          .input('PhoneNumber',VarChar, dtouser.PhoneNumber)
          .input('TypeUser', VarChar, dtouser.TypeUser)
          .input('Hashh', VarChar, dtouser.Hashh)
          .input('Statee', VarChar, dtouser.Statee)
          .input('PasswordUser', VarChar, dtouser.PasswordUser)
          .input('Mail', VarChar, dtouser.Mail)
          .query(queryinsert)
          resultquery = result.recordset[0].existuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return resultquery;
  
    }
    static updateUser=async(dtouser)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
              Update Users Set NamesUser=@NamesUser,LastName=@LastName,Addresss=@Addresss,PhoneNumber=@PhoneNumber,TypeUser=@TypeUser,Mail=@Mail where IDCard=@IDCard
              select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('IDCard', VarChar, dtouser.IDCard)
          .input('NamesUser', VarChar, dtouser.NamesUser)
          .input('LastName', VarChar, dtouser.LastName)
          .input('Addresss', VarChar, dtouser.Addresss)
          .input('PhoneNumber',VarChar, dtouser.PhoneNumber)
          .input('TypeUser', VarChar, dtouser.TypeUser)
          .input('Statee', VarChar, dtouser.Statee)
          .input('Mail', VarChar, dtouser.Mail)
          .query(queryupdate)
          // .input('Salt', VarChar, dtopassenger.salt)
          // .input('Passwordd', VarChar, dtopassenger.password)
         
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static updatePasswordUser=async(idcard,password,salt)=>
    {
           let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
            Update Users Set PasswordUser=@PasswordUser,Hashh=@Hashh where IDCard=@IDCard
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, idcard)
          .input('Hashh', VarChar, salt)
          .input('PasswordUser', VarChar, password)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
       
    }    
    static inactiveUser=async(idcard)=>
    {
          let resultquery;
          let queryupdate =`

          IF NOT EXISTS ( SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistuser
          END
          ELSE
          BEGIN
            Update Users Set Statee='Inactive' where IDCard=@IDCard
            select 1 as updatesuccess
          END

          `;
          let pool = await Conection.conection();  
          const result = await pool.request()
          .input('IDCard', VarChar,idcard)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistuser;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].updatesuccess;
          }
          pool.close();
          return resultquery;
  
    }
    
    //#endregion

    //#region GETS

    static getUser=async(idcard)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active')
            BEGIN
              select -1 as notexistuser
            END
            ELSE
            BEGIN
               SELECT * FROM Users WHERE IDCard=@IDCard and Statee='Active'
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCard', VarChar, idcard)
             .query(querysearch)
              resultquery = result.recordset[0].notexistuser; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let user = new DTOUser();
              this.getinformation(user, resultrecordset);
              resultquery=user
            }
           pool.close();
           return resultquery;
      
    
     }
     static getUsers=async(orderby="idcard")=>
    {
            let array=[];
            let querysearch = `
               SELECT * FROM Users WHERE Statee='Active'
               ORDER BY ${orderby} desc
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var u of result.recordset) {
              let user = new DTOUser();
              this.getinformation(user,u);
              array.push(user);
            } 
           pool.close();
           return array;
      
    
     }
     static getSearchUsers=async(name="",lastname="",address="",phone="",typeuser="",mail="" 
     ,orderby="idcard")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Users WHERE Statee='Active'
                AND  NamesUser LIKE '%${name}%' 
                AND LastName LIKE '%${lastname}%' 
                AND Addresss LIKE '%${address}%' 
                AND PhoneNumber LIKE '%${phone}%' 
                AND TypeUser LIKE '%${typeuser}%' 
                AND Mail LIKE '%${mail}%' 
                ORDER BY ${orderby} desc
             `

             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var u of result.recordset) {
                let user = new DTOUser();
              this.getinformation(user,u);
              array.push(user);
             } 
            pool.close();
            return array;
      }

    //#endregion

   //#region GET INFORMATION

   static getinformation(user, result) {

    user.IDCard = result.IDCard;
    user.NamesUser = result.NamesUser;
    user.LastName = result.LastName;
    user.Addresss = result.Addresss;
    user.PhoneNumber = result.PhoneNumber; 
    user.TypeUser = result.TypeUser;
    user.Hashh = result.Hashh; 
    user.Statee = result.Statee;
    user.PasswordUser = result.PasswordUser; 
    user.Mail = result.Mail;
   }

   //#endregion
}
module.exports = { DataUser };