import { Date, Int, Money, VarChar } from "mssql";
import DTOReservation from "../../shared/entity/DTOReservation";
import DTOReservationDetail from "../../shared/entity/DTOReservationDetail";
import { DataException } from "../../shared/exceptions/dataexception";
import { Conection } from "../Conection";
import IDataReservation from "../interfaces/IDataReservation";

export default class DataReservation implements IDataReservation 
{
     
    private static instancia: DataReservation;
    private constructor() { }
    public static getInstance(): DataReservation {
        if (!DataReservation.instancia) {
            DataReservation.instancia = new DataReservation();
        }

        return DataReservation.instancia;
    }
    registerReservation=async(dtreservation:DTOReservation)=>
    {
      try {
          let queryinsert = "insert into Reservation values (@NumberReservationn,@ReservationDate,@ArrivalDate,@DepartureDate,@ProcessStatus,@ConfirmationStatus,@Origin,@Total,@IDCardPassengerr)";
          let queryinsert2 = "insert into ReservationDetail values (@NumberRD,@Value,@NumberReservation,@NumberRoom)";
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('NumberReservationn', Int, dtreservation.numberreservation)
          .input('ReservationDate', Date, dtreservation.reservationdate)
          .input('ArrivalDate', Date, dtreservation.arrivaldate)
          .input('DepartureDate', Date, dtreservation.departuredate)
          .input('ProcessStatus',VarChar, dtreservation.processtatus)
          .input('ConfirmationStatus', VarChar, dtreservation.confirmationstatus)
          .input('Origin', VarChar, dtreservation.origin)
          .input('Total', Money, dtreservation.total)
          .input('IDCardPassengerr', VarChar, dtreservation.idcardpassenger)
          .query(queryinsert)
        
          for(let detailr of dtreservation.listDetailReservation)
          {
            const result2 = await pool.request()
            .input('NumberRD', Int, detailr.numberrd)
            .input('Value', Money, detailr.value)
            .input('NumberReservation', Int, dtreservation.numberreservation)
            .input('NumberRoom', Int, detailr.numberroom)
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
  
    
    getReservations=async()=>
    {
      try {
          let queryget = "select * from Reservation"
          let pool = await Conection.conection();
          let arrayreservation=[];
         
          const result = await pool.request()
          
          .query(queryget)
          for (let x of result.recordset) {
              
              let reservation = new DTOReservation(x.NumberReservationn,
                x.ReservationDate,x.ArrivalDate,x.DepartureDate,x.ProcessStatus,
                x.ConfirmationStatus,x.Origin,x.Total,x.IDCardPassengerr,await this.getDetailReservations(x.NumberReservationn));
                 arrayreservation.push(reservation);
           }
          pool.close();
          return arrayreservation;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
     getDetailReservations=async(numberreservation:number)=>
    {
      try {
          let queryget = "select * from ReservationDetail where NumberReservation=@NumberReservationn";
          let pool = await Conection.conection();
          let arraydetailreservation=[];
          const result = await pool.request()
          .input('NumberReservationn', Int, numberreservation)
          .query(queryget)
          for (let x of result.recordset) {
              
              let detailreservation = new DTOReservationDetail(x.NumberRD,
                x.Value,x.NumberRoom);
                arraydetailreservation.push(detailreservation);
           }
          pool.close();
          return arraydetailreservation;
      }
      catch(e)
      {
          throw new DataException("DataLayer Error: "+e.message)
      }
     }
}