import { Date, Int, Money, VarChar } from "mssql";
import DTOPayment from "../../shared/entity/DTOPayment";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataPayment from "../interfaces/IDataPayment";

export default class DataPayment implements IDataPayment 
{
     
    private static instancia: DataPayment;
    private constructor() { }
    public static getInstance(): DataPayment {
        if (!DataPayment.instancia) {
            DataPayment.instancia = new DataPayment();
        }

        return DataPayment.instancia;
    }
    getPayments=async()=>
    {
      try {
          let queryget = "select * from Payment";
          let pool = await Conection.conection();
          let arraypay=[];
         
          const result = await pool.request()
          
          .query(queryget)
          for (let x of result.recordset) {
              
              let paym = new DTOPayment(x.IDPaymentt,x.IDCardPa,x.NumberReservation,x.IDPassangerServicee,
                x.PassengerAmount,x.TotalRS,x.Datee);
                arraypay.push(paym);
           }
          pool.close();
          return arraypay;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
    registerPayment=async(dtopay:DTOPayment)=>
     {
        try {
            let queryinsert = "insert into Payment values (@NumberReservation,@IDCardPa,@IDPassangerServicee,@PassengerAmount,@TotalRS,@Datee)";
           
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('NumberReservation', Int, dtopay.numberreservation)
            .input('IDCardPa', VarChar, dtopay.idcardpassenger)
            .input('IDPassangerServicee', Int, dtopay.idpassengerservice)
            .input('PassengerAmount', Money, dtopay.passengeramount)
            .input('TotalRS',Money, dtopay.totalrs)
            .input('Datee',Date, dtopay.date)
           
            .query(queryinsert)
            pool.close();
           return true;
         
           
        }
        catch(e)
        {
            throw new DataException("DataLayer Error: "+e.message)
        }
     }
}