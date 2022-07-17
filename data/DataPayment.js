const { VarChar,Int, Money, Date } = require("mssql");
const { DTOPayment } = require("../DTO/DTOPayment");
const { Conection } = require("./Conection");
class DataPayment
{
    //#region CRUD

    static registerPayment=async(idpassenger,numberreservation,
      numberps,passengeramount,datee,totalrs)=>
    {
      let resultquery;
       let queryinsert = `   
       
            IF NOT EXISTS ( SELECT NumberReservationn FROM Reservation WHERE NumberReservationn=@NumberReservationn AND IDCardPassengerr=@IDCard)
            BEGIN
              select -1 as noexistreservation
            END
            ELSE
            BEGIN
                IF NOT EXISTS ( SELECT NumberPS FROM PassengerServicee WHERE NumberPS=@NumberPS AND idcardp=@IDCard)
                BEGIN
                  select -2 as notexistpassengerservice
                END
                ELSE
                BEGIN
                  insert into Payment values 
                  (@NumberReservationn,@IDCard,@NumberPS,
                    @PassengerAmount,@TotalRS,@Datee)
                    select 1 as insertsuccess
                END
             END       
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, idpassenger)
          .input('NumberReservationn', Int, numberreservation)
          .input('PassengerAmount', Money, passengeramount)
          .input('Datee', Date, datee)
          .input('TotalRS', Money, totalrs)
          .input('NumberPS', Int, numberps)
          .query(queryinsert)
          resultquery = result.recordset[0].noexistreservation;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].notexistpassengerservice;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].insertsuccess;
            }          
          }                                                              
          pool.close();
          return resultquery;
  
    }
    //#endregion

    //#region GETS

    static getPayment=async(idpayment)=>
    {
            let array=[];
            let resultquery;
            let querysearch = `
            IF NOT EXISTS ( SELECT IDPaymentt FROM Payment WHERE IDPaymentt=${idpayment})
              BEGIN
                select -1 as noexistpayment
              END
            ELSE
            BEGIN

              SELECT

              p.IDPaymentt,
              p.NumberReservation,
              p.IDCardPa,
              p.IDPassangerServicee,
              p.PassengerAmount,
              p.TotalRS as TotalPayment,
              p.Datee,
            
              rd.NumberRD,
              rd.Value,
              rd.NumberRoom,
            
              r.ReservationDate,
              r.ArrivalDate, 
              r.DepartureDate, 
              r.ProcessStatus, 
              r.ConfirmationStatus,
              r.Origin,
              r.Total as TotalReservation,
            
              dps.IDDPassangerService,
              dps.IDServicee,
              dps.Amount,
            
              ps.StartDate,
              ps.EndDate,
              ps.Total as TotalPS ,
              ps.Observations
              
              FROM 
              Payment as p INNER JOIN ReservationDetail rd
              ON p.NumberReservation=rd.NumberReservation
              INNER JOIN Reservation r ON r.NumberReservationn=rd.NumberReservation
              INNER JOIN DetailPassengerService dps ON dps.NumberPService=p.IDPassangerServicee
              INNER JOIN PassengerServicee ps ON ps.NumberPS=dps.NumberPService
              WHERE idpaymentt=${idpayment}
            
            END
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDPaymentt', Int, idpayment)
             .query(querysearch)
            resultquery = result.recordset[0].noexistpayment; 
            if (resultquery===undefined) {
              for (var precord of result.recordset) {
                let dtop  = new DTOPayment();
                this.getinformation(dtop,precord);
                array.push(dtop);
                
              }
              resultquery=array;
            }
            
           pool.close();
           return resultquery;
      
    
     }  
    static getPaymentMultipleId=async(arrayidpayment,orderby="IDPaymentt")=>
    {
             let array=[];
            let querysearch = `

            SELECT

            p.IDPaymentt,
            p.NumberReservation,
            p.IDCardPa,
            p.IDPassangerServicee,
            p.PassengerAmount,
            p.TotalRS as TotalPayment,
            p.Datee,
          
            rd.NumberRD,
            rd.Value,
            rd.NumberRoom,
          
            r.ReservationDate,
            r.ArrivalDate, 
            r.DepartureDate, 
            r.ProcessStatus, 
            r.ConfirmationStatus,
            r.Origin,
            r.Total as TotalReservation,
          
            dps.IDDPassangerService,
            dps.IDServicee,
            dps.Amount,
          
            ps.StartDate,
            ps.EndDate,
            ps.Total as TotalPS ,
            ps.Observations
            
            FROM 
            Payment as p INNER JOIN ReservationDetail rd
            ON p.NumberReservation=rd.NumberReservation
            INNER JOIN Reservation r ON r.NumberReservationn=rd.NumberReservation
            INNER JOIN DetailPassengerService dps ON dps.NumberPService=p.IDPassangerServicee
            INNER JOIN PassengerServicee ps ON ps.NumberPS=dps.NumberPService
            WHERE idpaymentt in
                (
                  ${
                    this.forinsidestring(arrayidpayment)
                    }
                )

                ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)        
             for (var precord of result.recordset) {
              let dtop  = new DTOPayment();
              this.getinformation(dtop,precord);
              array.push(dtop);
              
            }
           pool.close();
           return array;
      }
    static getSearchPayment=async(idpayment1=0,idpayment2=99999,
      numberr1=0,numberr2=99999,idpassengerservice1=0,
      idpassengerservice2=99999,idcardpassenger=""
      ,date1='2000-08-08',date2='2100-08-08',orderby="IDPaymentt"
      )=>
      {
              let array=[];
              let resultquery;
              let querysearch = `

                SELECT
  
                p.IDPaymentt,
                p.NumberReservation,
                p.IDCardPa,
                p.IDPassangerServicee,
                p.PassengerAmount,
                p.TotalRS as TotalPayment,
                p.Datee,
              
                rd.NumberRD,
                rd.Value,
                rd.NumberRoom,
              
                r.ReservationDate,
                r.ArrivalDate, 
                r.DepartureDate, 
                r.ProcessStatus, 
                r.ConfirmationStatus,
                r.Origin,
                r.Total as TotalReservation,
              
                dps.IDDPassangerService,
                dps.IDServicee,
                dps.Amount,
              
                ps.StartDate,
                ps.EndDate,
                ps.Total as TotalPS ,
                ps.Observations
                
                FROM 
                Payment as p INNER JOIN ReservationDetail rd
                ON p.NumberReservation=rd.NumberReservation
                INNER JOIN Reservation r ON r.NumberReservationn=rd.NumberReservation
                INNER JOIN DetailPassengerService dps ON dps.NumberPService=p.IDPassangerServicee
                INNER JOIN PassengerServicee ps ON ps.NumberPS=dps.NumberPService
                WHERE p.IDPaymentt between ${idpayment1} and ${idpayment2}
                and p.NumberReservation between ${numberr1} and ${numberr2}
                and p.IDPassangerServicee between ${idpassengerservice1} and ${idpassengerservice2}
                and p.IDCardPa like '%${idcardpassenger}%'
                and p.Datee between @date1 and @date2 

                order by ${orderby} desc
            
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('date1', Date, date1)
               .input('date2', Date, date2)
               .query(querysearch)
              resultquery = result.recordset[0].noexistpayment; 
              if (resultquery===undefined) {
                for (var precord of result.recordset) {
                  let dtop  = new DTOPayment();
                  this.getinformation(dtop,precord);
                  array.push(dtop);
                  
                }
                resultquery=array;
              }
              
             pool.close();
             return resultquery;
        
      
       }  
    
   
    
    //#endregion

   //#region GET INFORMATION

   static getinformation(p, result) {

    
    p.IDPaymentt=result.IDPaymentt;
    p.NumberReservation=result.NumberReservation;
    p.IDCardPa=result.IDCardPa;
    p.IDPassangerServicee=result.IDPassangerServicee;
    p.PassengerAmount=result.PassengerAmount;
    p.TotalPayment=result.TotalPayment;
    p.Datee=result.Datee
  
    p.NumberRD=result.NumberRD
    p.Value=result.Value
    p.NumberRoom=result.NumberRoom
  
    p.ReservationDate=result.ReservationDate
    p.ArrivalDate=result.ArrivalDate
    p.DepartureDate=result.DepartureDate
    p.ProcessStatus=result.ProcessStatus
    p.ConfirmationStatus=result.ConfirmationStatus
    p.Origin=result.Origin
    p.TotalReservation=result.TotalReservation
  
    p.IDDPassangerService=result.IDDPassangerService
    p.IDServicee=result.IDServicee
    p.Amount=result.Amount
  
    p.StartDate=result.StartDate
    p.EndDate=result.EndDate
    p.TotalPS=result.TotalPS
    p.Observations=result.Observations

    
   }
//#region Others

  static forinsidestring(array)
  {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (index===array.length-1) {
        stringelement=stringelement+element
      }
      else
      {
        stringelement=stringelement+element+","
      }
      
    }
    return stringelement

  }
//#endregion

}
module.exports = { DataPayment };