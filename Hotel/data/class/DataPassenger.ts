import { VarChar } from "mssql";
import DTOPassenger from "../../shared/entity/DTOPassenger";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataPassenger from "../interfaces/IDataPassenger";

export default class DataPassenger implements IDataPassenger 
{
     
    private static instancia: DataPassenger;
    private constructor() { }
    public static getInstance(): DataPassenger {
        if (!DataPassenger.instancia) {
            DataPassenger.instancia = new DataPassenger();
        }

        return DataPassenger.instancia;
    }
    registerPassenger=async(dtopassenger:DTOPassenger)=>
    {
      try {
          let queryinsert = "insert into Passenger values (@IDCard,@Names,@LastName,@Country,@Town,@Addresss,@PhoneNumber,@Mail,@Salt,@Passwordd,'Active')";
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
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updatePassenger =async(dtopassenger:DTOPassenger)=>
    {
      try {
          let queryupdate = "Update Passenger Set Names=@Names,LastName=@LastName,Country=@Country,Town=@Town,Addresss=@Addresss,PhoneNumber=@PhoneNumber,Mail=@Mail,Salt=@Salt,Passwordd=@Passwordd where IDCard=@IDCard";
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
           .query(queryupdate)
             
         
          pool.close();
          return true;
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    changeStatePassenger=async(idcard:string,state:string)=>
    {
      try {
          let queryupdate = "Update Passenger Set Statee=@Statee where IDCard=@IDCard";
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
    getPassengers=async()=>
    {
      try {
          let queryget = "select * from Passenger"
          let pool = await Conection.conection();
          let arraypassenger=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let passenger = new DTOPassenger(x.IDCard,
                 x.Names,x.LastName,
                 x.Country,x.Town,
                 x.Addresss,x.PhoneNumber,
                 x.Mail,x.Salt,x.Passwordd,x.Statee);
                 arraypassenger.push(passenger);
           }
          pool.close();
          return arraypassenger;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}