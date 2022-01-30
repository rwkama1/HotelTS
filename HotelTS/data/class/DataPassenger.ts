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
    //#region CUD
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
    //#endregion
  
     //#region SEARCH
     getPassengerbyID=async(idcard:string)=>
     {
     let pool = await Conection.conection();
     var dtopassenger=null;
     try {
         let queryget = `select * from Passenger where idcard=@IDCard`;
         
         
         const result = await pool.request()
         .input('IDCard',VarChar, idcard)
         .query(queryget)
       
         dtopassenger = new DTOPassenger(result.recordset[0].IDCard,result.recordset[0].Names,
             result.recordset[0].LastName,result.recordset[0].Country,result.recordset[0].Town
             ,result.recordset[0].Addresss,result.recordset[0].PhoneNumber,result.recordset[0].Mail
             ,result.recordset[0].Salt,result.recordset[0].Passwordd
             ,result.recordset[0].Statee); 
 
         return dtopassenger
         
     }
     catch(e)
     {
         return dtopassenger
     }
     finally
     {
     pool.close();
     }
     }
     getPassengerSearch=async(idcard,name,LastName,country,town,phonenumber,address,mail)=>
     {
     try {
         let queryget=`SELECT *
         FROM passenger
         WHERE  idcard LIKE '%${idcard}%'
                AND names LIKE '%${name}%'
                AND lastname LIKE '%${LastName}%'
                AND country LIKE '%${country}%'
                AND town LIKE '%${town}%'
                AND phonenumber LIKE '%${phonenumber}%'
                AND addresss LIKE '%${address}%'
                AND mail LIKE '%${mail}%'
                AND statee='Active'`;
         
         let pool = await Conection.conection();
         let arrayu=[];
         const result = await pool.request()
         .query(queryget)
 
 
         for (let x of result.recordset) {
            let passenger = new DTOPassenger(x.IDCard,
                x.Names,x.LastName,
                x.Country,x.Town,
                x.Addresss,x.PhoneNumber,
                x.Mail,x.Salt,x.Passwordd,x.Statee);
             arrayu.push(passenger);
         }
         pool.close();
         return arrayu;
     }
     catch(e)
     {
         throw new DataException("A error occurred related to the passenger database:"+e.message)
     }
     }
     //#endregion
    //#region LISTS
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
          throw new DataException("An error occurred related to the user database: "+e.message)
      }
     }
    getPassengerActives=async()=>
    {
    try {
        let queryget = "select * from Passenger where Statee='Active'";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let dtopassenger = new DTOPassenger(x.IDCard,
                x.Names,x.LastName,
                x.Country,x.Town,
                x.Addresss,x.PhoneNumber,x.Mail,
                x.Salt,x.Passwordd,x.Statee);
            arrayu.push(dtopassenger);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    getUsersInactive=async()=>
    {
    try {
        let queryget = "select * from Passenger where Statee='Inactive'";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let dtopassenger = new DTOPassenger(x.IDCard,
                x.Names,x.LastName,
                x.Country,x.Town,
                x.Addresss,x.PhoneNumber,x.Mail,
                x.Salt,x.Passwordd,x.Statee);
            arrayu.push(dtopassenger);
            }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyIdCardDesc=async()=>
    {
    try {
        let queryget = "select * from Passenger where Statee='Active' order by IDCard desc";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let dtopassenger = new DTOPassenger(x.IDCard,
                x.Names,x.LastName,
                x.Country,x.Town,
                x.Addresss,x.PhoneNumber,x.Mail,
                x.Salt,x.Passwordd,x.Statee);
            arrayu.push(dtopassenger);
            }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyNameDesc=async()=>
    {
    try {
        let queryget = "select * from Passenger where Statee='Active' order by Names desc";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
       
        for (let x of result.recordset) {
            let dtopassenger = new DTOPassenger(x.IDCard,
                x.Names,x.LastName,
                x.Country,x.Town,
                x.Addresss,x.PhoneNumber,x.Mail,
                x.Salt,x.Passwordd,x.Statee);
            arrayu.push(dtopassenger);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("A error occurred related to the passenger database:   "+e.message)
    }
    }
    SortbyNameAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by Names asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
        }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyAddressDesc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by Addresss desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyAddressAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by Addresss asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
    arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyPhoneDesc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by PhoneNumber desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyPhoneAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by PhoneNumber asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
    arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database: "+e.message)
    }
    }   
    SortbyCountryDesc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by country desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbyCountryAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by country asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
    arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }
    SortbymailDesc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by mail desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database: "+e.message)
    }
    }  
    SortbyMailAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by mail asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database: "+e.message)
    }
    }
    SortbyTownDesc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by town desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }  
    SortbyTownAsc=async()=>
    {
    try {
    let queryget = "select * from Passenger where Statee='Active' order by town asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let dtopassenger = new DTOPassenger(x.IDCard,
            x.Names,x.LastName,
            x.Country,x.Town,
            x.Addresss,x.PhoneNumber,x.Mail,
            x.Salt,x.Passwordd,x.Statee);
        arrayu.push(dtopassenger);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("A error occurred related to the passenger database:"+e.message)
    }
    }

    //#endregion
   
}