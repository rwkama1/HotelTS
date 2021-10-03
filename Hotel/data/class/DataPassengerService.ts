import { Date, Int, Money, VarChar } from "mssql";
import DTODPassengerService from "../../shared/entity/DTODPassengerService";
import DTOPassengerService from "../../shared/entity/DTOPassengerService";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataPassengerService from "../interfaces/IDataPassengerService";

export default class DataPassengerService implements IDataPassengerService 
{ 
    private static instancia: DataPassengerService;
    private constructor() { }
    public static getInstance(): DataPassengerService {
        if (!DataPassengerService.instancia) {
            DataPassengerService.instancia = new DataPassengerService();
        }

        return DataPassengerService.instancia;
    }
    registerPassengerService=async(dtopservice:DTOPassengerService)=>
    {
      try {
          let queryinsert = "insert into PassengerServicee values (@NumberPS,@IDCardP,@StartDate,@EndDate,@Total,@Observations)";
          let queryinsert2 = "insert into DetailPassengerService values (@IDDPassangerService,@NumberPService,@IDServicee,@Amount)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NumberPS', Int, dtopservice.numberps)
          .input('IDCardP', VarChar, dtopservice.idcardp)
          .input('StartDate', Date, dtopservice.startdate)
          .input('EndDate', Date, dtopservice.enddate)
          .input('Total',Money, dtopservice.total)
          .input('Observations', VarChar, dtopservice.observations)
         
          .query(queryinsert)
        
          for(let detailr of dtopservice.listdetailps)
          {
            const result2 = await pool.request()
            .input('IDDPassangerService', Int, detailr.numberdetailps)
            .input('NumberPService', Int, dtopservice.numberps)
            .input('IDServicee', Int, detailr.idservice)
            .input('Amount', Money, detailr.amount)
            .query(queryinsert2)
          }
          pool.close();
         return true;
       
         
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
  
    }
    listPassengersServices=async()=>
    {
      try {
          let queryget = "select * from PassengerServicee";
          let pool = await Conection.conection();
          let arraypassengerservice=[];
         
          const result = await pool.request()
          
          .query(queryget)
          for (let x of result.recordset) {
              
              let passengerservices = new DTOPassengerService
              (x.NumberPS,x.IDCardP,x.StartDate,x.EndDate,x.Total,
                x.Observations,await this.getDPS(x.NumberPS));
                arraypassengerservice.push(passengerservices);
           }
          pool.close();
          return arraypassengerservice;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     getDPS=async(idps:number)=>
     {
       try {
           let queryget = "select * from DetailPassengerService where NumberPService=@NumberPService";
           let pool = await Conection.conection();
           let arraydpassengerservice=[];
           const result = await pool.request()
           .input('NumberPService', Int, idps)
           .query(queryget)
           for (let x of result.recordset) {
               
               let detailps = new DTODPassengerService
               (x.IDDPassangerService,x.IDServicee,x.Amount);
                 arraydpassengerservice.push(detailps);
            }
           pool.close();
           return arraydpassengerservice;
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
      }
      addDPS=async(dtopservice:DTOPassengerService)=>
     {
        let listdtrlength=dtopservice.listdetailps.length;
        let queryinsert2 = "insert into DetailPassengerService values (@IDDPassangerService,@NumberPService,@IDServicee,@Amount)";
       try {
          
           let pool = await Conection.conection();
          
           const result2 = await pool.request()
            .input('IDDPassangerService', Int, dtopservice.listdetailps[listdtrlength-1].numberdetailps)
            .input('NumberPService', Int,dtopservice.numberps)
            .input('IDServicee', Int,  dtopservice.listdetailps[listdtrlength-1].idservice)
            .input('Amount', Money, dtopservice.listdetailps[listdtrlength-1].amount)
            .query(queryinsert2)
             
           pool.close();
           return true;
          
       }
       catch(e)
       {
           throw new DataException("DataLayer Error: "+e.message)
       }
   
     }
}