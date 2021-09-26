import { VarChar } from "mssql";
import DTOUser from "../../shared/entity/DTOUser";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataUsers from "../interfaces/IDataUser";

export default class DataUser implements IDataUsers {
    
    private static instancia: DataUser;
    private constructor() { }
    public static getInstance(): DataUser {
        if (!DataUser.instancia) {
            DataUser.instancia = new DataUser();
        }

        return DataUser.instancia;
    }
    
     registerUser=async(dtuser:DTOUser)=>
    {
      try {
          let queryinsert = "insert into Users values (@IDCard,@NamesUser,@LastName,@Addresss,@PhoneNumber,@TypeUser,@Hashh,'Active',@PasswordUser,@Mail)"
          let pool = await Conection.conection();
        //   let sqltools=Conection.sqlserver();
          const result = await pool.request()
              .input('IDCard',VarChar, dtuser.idcard)
              .input('NamesUser', VarChar, dtuser.name)
              .input('LastName', VarChar, dtuser.surname)
              .input('Addresss', VarChar, dtuser.address)
              .input('PhoneNumber', VarChar, dtuser.phone)
              .input('TypeUser', VarChar, dtuser.typeuserr)
              .input('PasswordUser', VarChar, dtuser.password)
              .input('Hashh', VarChar, dtuser.hashh)
              .input('Mail', VarChar, dtuser.maill)
              .query(queryinsert)
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
     updateUser=async(dtuser:DTOUser)=>
    {
      try {
          let queryupdate = "Update Users Set NamesUser=@NamesUser,LastName=@LastName,Addresss=@Addresss,PhoneNumber=@PhoneNumber,TypeUser=@TypeUser,PasswordUser=@PasswordUser,Hashh=@Hashh,Mail=@Mail where IDCard=@IDCard";
          let pool = await Conection.conection();
        
          const result = await pool.request()
              .input('IDCard', VarChar, dtuser.idcard)
              .input('NamesUser', VarChar, dtuser.name)
              .input('LastName', VarChar, dtuser.surname)
              .input('Addresss', VarChar, dtuser.address)
              .input('PhoneNumber', VarChar, dtuser.phone)
              .input('TypeUser', VarChar, dtuser.typeuserr)
              .input('PasswordUser', VarChar, dtuser.password)
              .input('Hashh', VarChar, dtuser.hashh)
              .input('Mail', VarChar, dtuser.maill)
              .query(queryupdate)
             
         
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
     changeStateUser=async(idcard:string,state:string)=>
    {
      try {
          let queryupdate = "Update Users Set Statee=@Statee where IDCard=@IDCard";
          let pool = await Conection.conection();
         
          const result = await pool.request()
              .input('IDCard', VarChar,idcard)
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
    getUsers=async()=>
    {
      try {
          let queryget = "select * from Users"
          let pool = await Conection.conection();
          let arrayu=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let user = new DTOUser(x.IDCard,
                 x.NamesUser,x.LastName,
                 x.Addresss,x.PhoneNumber,
                 x.TypeUser,x.PasswordUser,
                 x.Hashh,x.Mail,x.Statee);
              arrayu.push(user);
           }
          pool.close();
          return arrayu;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
  
}