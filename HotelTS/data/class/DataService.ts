import { Int, Money, VarChar } from "mssql";
import DTOService from "../../shared/entity/DTOService";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataService from "../interfaces/IDataService";

export default class DataService implements IDataService 
{
     
    private static instancia: DataService;
    private constructor() { }
    public static getInstance(): DataService {
        if (!DataService.instancia) {
            DataService.instancia = new DataService();
        }

        return DataService.instancia;
    }
    registerService=async(dtoservice:DTOService)=>
    {
      try {
          let queryinsert = "insert into Servicee values (@NameS,@Value,'Active')";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NameS', VarChar, dtoservice.name)
          .input('Value', Money, dtoservice.value)
          .query(queryinsert)
          pool.close();
          return true;   
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    updateService=async(dtoservice:DTOService)=>
    {
        try {
            let queryupdate = "Update Servicee Set NameS=@NameS,Value=@Value where IDService=@IDService";
            let pool = await Conection.conection();
           
            const result = await pool.request()
            .input('IDService', Int, dtoservice.idservice)
            .input('NameS', VarChar, dtoservice.name)
            .input('Value', Money, dtoservice.value)
             .query(queryupdate)
               
           
            pool.close();
            return true;
           
        }
        catch(e)
        {
            throw new DataException("DataLayer Error: "+e.message)
        }
  
    }
    changeStateService=async(idservice:number,state:string)=>
    {
      try {
          let queryupdate = "Update Servicee Set Statee=@Statee where IDService=@IDService";
          let pool = await Conection.conection();
         
          const result = await pool.request()
              .input('IDService', Int,idservice)
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
    getServices=async()=>
    {
      try {
          let queryget = "select * from Servicee"
          let pool = await Conection.conection();
          let arrays=[];
          const result = await pool.request()
          .query(queryget)
          for (let x of result.recordset) {
              let s = new DTOService(x.IDService,x.NameS,x.Value,x.Statee);
                 arrays.push(s);
           }
          pool.close();
          return arrays;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}