const { VarChar,Int, Money, Date } = require("mssql");
const { DTORoom } = require("../DTO/DTORoom");
const { DTOReservation } = require("../DTO/DTOReservation");
const { Conection } = require("./Conection");
const { DTOReservationDetail } = require("../DTO/DTOReservationDetail");
const { DataRoom } = require("./DataRoom");
const { DataPassenger } = require("./DataPassenger");


class DataReservation
{
    //#region CRUD

    static registerHotelReservation=async(idcardpassenger,arrivaldate,
      departureDate,reservationdate,total,arraydetailr)=>
    {
      let resultquery;
          let queryinsert = `  

          IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistpassenger
          END
          ELSE
          BEGIN
            BEGIN TRANSACTION  
                insert into Reservation values (@ReservationDate,@ArrivalDate,@DepartureDate,
                  'Confirmed','Confirmed','Hotel',@Total,@IDCard)
                  ${this.forAddDetailReservation(arraydetailr)}
                    select 1 as insertsuccess
                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                COMMIT TRANSACTION  
                END   
            END       
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, idcardpassenger)
          .input('ArrivalDate', Date, arrivaldate)
          .input('DepartureDate', Date, departureDate)
          .input('ReservationDate', Date, reservationdate)
          .input('Total', Money, total)
          .query(queryinsert)
          resultquery = result.recordset[0].notexistpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return true;
  
    }
    static registerOnlineReservation=async(idcardpassenger,arrivaldate,
      departureDate,reservationdate,total,arraydetailr)=>
    {
      let resultquery;
          let queryinsert = `  

          IF NOT EXISTS ( SELECT * FROM Passenger WHERE IDCard=@IDCard and Statee='Active')
          BEGIN
            select -1 as notexistpassenger
          END
          ELSE
          BEGIN
            BEGIN TRANSACTION  
                insert into Reservation values (@ReservationDate,@ArrivalDate,@DepartureDate,
                  'Pending','NotConfirmed','Online',@Total,@IDCard)
                  ${this.forAddDetailReservation(arraydetailr)}
                    select 1 as insertsuccess
                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                COMMIT TRANSACTION  
                END   
            END       
         
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .input('IDCard', VarChar, idcardpassenger)
          .input('ArrivalDate', Date, arrivaldate)
          .input('DepartureDate', Date, departureDate)
          .input('ReservationDate', Date, reservationdate)
          .input('Total', Money, total)
          .query(queryinsert)
          resultquery = result.recordset[0].notexistpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return true;
  
    }
    static cancelReservation=async(numberreservation)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservation=@NumberReservation)
          BEGIN
            select -1 as notexistreservation
          END
          ELSE
          BEGIN
             UPDATE Reservation SET processtatus='Canceled',confirmationstatus='NotConfirmed' WHERE NumberReservation=@NumberReservation
             select 1 as canceledsuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberReservation', Int,numberreservation)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistreservation;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].canceledsuccess;
          }
          pool.close();
          return resultquery;
       
    }
    static confirmReservation=async(numberreservation)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservation=@NumberReservation)
          BEGIN
            select -1 as notexistreservation
          END
          ELSE
          BEGIN
             UPDATE Reservation SET processstatus='Confirmed',confirmationstatus='Confirmed' WHERE NumberReservation=@NumberReservation
             select 1 as confirmsucess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberReservation', Int,numberreservation)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistreservation;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].confirmsucess;
          }
          pool.close();
          return resultquery;
       
    }

    // Detail Reservation

    static addDetailReservation=async(numberreservation,numberrom)=>
    {
          let resultquery;
          let queryupdate = `

          IF EXISTS ( SELECT * FROM ReservationDetail WHERE NumberRoom=@NumberRoom and NumberReservation=@NumberReservation)
          BEGIN
            select -1 as existreservationdetail
          END
          ELSE
          BEGIN
             DELETE FROM ReservationDetail WHERE NumberRoom=@NumberRoom and NumberReservation=@NumberReservation
             select 1 as insertsuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberRoom', Int, numberrom)
          .input('NumberReservation', Int,numberreservation)
          .query(queryupdate)
          resultquery = result.recordset[0].existreservationdetail;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return resultquery;
       
    }
   
    static removeDetailReservation=async(numberreservation,numberrom)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM ReservationDetail WHERE NumberRoom=@NumberRoom and NumberReservation=@NumberReservation)
          BEGIN
            select -1 as notexistreservationdetail
          END
          ELSE
          BEGIN
             DELETE FROM ReservationDetail WHERE NumberRoom=@NumberRoom and NumberReservation=@NumberReservation
             select 1 as deletesuccess
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberRoom', Int, numberrom)
          .input('NumberReservation', Int,numberreservation)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistreservationdetail;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].deletesuccess;
          }
          pool.close();
          return resultquery;
       
    }
   
   
    
    
    //#endregion

    //#region GETS

    static getReservation=async(numberreservation)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Reservation WHERE NumberReservationn=@NumberReservationn)
            BEGIN
              select -1 as notexistreservation
            END
            ELSE
            BEGIN
                SELECT * FROM Reservation
                WHERE NumberReservationn=@NumberReservationn
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('NumberReservationn', Int, numberreservation)
             .query(querysearch)
            resultquery = result.recordset[0].notexistreservation; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let resr = new DTOReservation();
              this.getinformation(resr, resultrecordset);
              resultquery=resr
            }
           pool.close();
           return resultquery;
      
    
     }


     static getReservations=async(orderby="NumberReservationn")=>
     {
             let resultquery;
             let querysearch = `

                 SELECT * FROM Reservation
                 ORDER BY ${orderby} desc

             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)        
              for (var r of result.recordset) {
                let reserv = new DTOReservation();
                this.getinformationReservation(reserv,  r);
                array.push(reserv);
              } 
            pool.close();
            return resultquery;
       
     
      }
    static getConfirmedReservations=async(orderby="NumberReservationn")=>
      {
              let resultquery;
              let querysearch = `
                  SELECT * FROM Reservation where ProcessStatus='Confirmed'
                  ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)        
               for (var r of result.recordset) {
                 let reserv = new DTOReservation();
                 this.getinformationReservation(reserv,  r);
                 array.push(reserv);
               } 
             pool.close();
             return resultquery;
        
      
       }
    static getPendingReservations=async(orderby="NumberReservationn")=>
       {
               let resultquery;
               let querysearch = `
                   SELECT * FROM Reservation where ProcessStatus='Pending'
                   ORDER BY ${orderby} desc
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .query(querysearch)        
                for (var r of result.recordset) {
                  let reserv = new DTOReservation();
                  this.getinformationReservation(reserv,  r);
                  array.push(reserv);
                } 
              pool.close();
              return resultquery;
         
       
        }
    static getCanceledReservations=async(orderby="NumberReservationn")=>
     {
             let resultquery;
             let querysearch = `
                 SELECT * FROM Reservation where ProcessStatus='Canceled'
                 ORDER BY ${orderby} desc
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)        
              for (var r of result.recordset) {
                let reserv = new DTOReservation();
                this.getinformationReservation(reserv,  r);
                array.push(reserv);
              } 
            pool.close();
            return resultquery;
       
     
      }  
    static getReservationsByPassenger=async(idcardpassenger,orderby="NumberReservationn")=>
      {
              let resultquery;
              let querysearch = `

                  SELECT * FROM Reservation WHERE
                   IDCardPassengerr=@IDCardPassengerr
                  ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('IDCardPassengerr', Int, idcardpassenger)
               .query(querysearch)        
               for (var r of result.recordset) {
                 let reserv = new DTOReservation();
                 this.getinformationReservation(reserv,  r);
                 array.push(reserv);
               } 
             pool.close();
             return resultquery;
        
      
       }  
    static getReservationsPendingByPassenger=async(idcardpassenger,orderby="NumberReservationn")=>
       {
               let resultquery;
               let querysearch = `
 
                   SELECT * FROM Reservation WHERE
                    IDCardPassengerr=@IDCardPassengerr AND ProcessStatus='Pending'
                   ORDER BY ${orderby} desc
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .input('IDCardPassengerr', Int, idcardpassenger)
                .query(querysearch)        
                for (var r of result.recordset) {
                  let reserv = new DTOReservation();
                  this.getinformationReservation(reserv,  r);
                  array.push(reserv);
                } 
              pool.close();
              return resultquery;
         
       
        }  
    static getReservationsBetweenReservationDates=async(date1,date2,orderby="NumberReservationn")=>
        {
                let resultquery;
                let querysearch = `
  
                SELECT * FROM Reservation WHERE ReservationDate
                BETWEEN  @Date1 and @Date2 
                ORDER BY ${orderby} desc
                `
                let pool = await Conection.conection();
                 const result = await pool.request()
                 .input('Date1', Date, date1)
                 .input('Date2', Date, date2)
                 .query(querysearch)        
                 for (var r of result.recordset) {
                   let reserv = new DTOReservation();
                   this.getinformationReservation(reserv,  r);
                   array.push(reserv);
                 } 
               pool.close();
               return resultquery;
          
        
         }  
     static getReservationsBetweenArrivalDates=async(date1,date2,orderby="NumberReservationn")=>
        {
                let resultquery;
                let querysearch = `
  
                SELECT * FROM Reservation WHERE ArrivalDate
                BETWEEN  @Date1 and @Date2 
                ORDER BY ${orderby} desc
                `
                let pool = await Conection.conection();
                 const result = await pool.request()
                 .input('Date1', Date, date1)
                 .input('Date2', Date, date2)
                 .query(querysearch)        
                 for (var r of result.recordset) {
                   let reserv = new DTOReservation();
                   this.getinformationReservation(reserv,  r);
                   array.push(reserv);
                 } 
               pool.close();
               return resultquery;
          
        
         } 
     static getReservationsBetweenDepartureDates=async(date1,date2,orderby="NumberReservationn")=>
         {
                 let resultquery;
                 let querysearch = `
   
                 SELECT * FROM Reservation WHERE DepartureDate
                 BETWEEN  @Date1 and @Date2 
                 ORDER BY ${orderby} desc
                 `
                 let pool = await Conection.conection();
                  const result = await pool.request()
                  .input('Date1', Date, date1)
                  .input('Date2', Date, date2)
                  .query(querysearch)        
                  for (var r of result.recordset) {
                    let reserv = new DTOReservation();
                    this.getinformationReservation(reserv,  r);
                    array.push(reserv);
                  } 
                pool.close();
                return resultquery;
           
         
          }       
    


    //#endregion

   //#region GET INFORMATION

   static getinformationReservation(reservation, result) {


    reservation.NumberReservationn=result.NumberReservationn;
    reservation.ReservationDate=result.ReservationDate;
    reservation.ArrivalDate=result.ArrivalDate;
    reservation.DepartureDate=result.DepartureDate;
    reservation.ProcessStatus=result.ProcessStatus;
    reservation.ConfirmationStatus=result.ConfirmationStatus;
    reservation.Origin=result.Origin;
    reservation.Total=result.Total;
    DataPassenger.getinformation(reservation.Passengerr,result)
    
   }
   
   static getinformationDetailReservationTotal(detailreservation, result) {

    detailreservation.Total=result.Total;
    detailreservation.Value=result.Value;
    detailreservation.Reservation=null;
    DataRoom.getinformation(detailreservation.Room,result)

   }
   static forinsidestringrooms(array)//pass all numbers to string for sql query
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

   static forAddDetailReservation(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
     

        stringelement=stringelement+
        `
        insert into ReservationDetail values (${element.Value},IDENT_CURRENT('Reservation'),
        ${element.Room.NumberRoomm})
        `
      
     
    }
    return stringelement
   
   }
   //#endregion
}
module.exports = { DataReservation };