const { VarChar,Int, Money, Date } = require("mssql");

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

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
            BEGIN
              select -1 as notexistreservation
            END
          ELSE
          BEGIN
             UPDATE Reservation SET processstatus='Canceled',confirmationstatus='NotConfirmed' 
             WHERE NumberReservationn=@NumberReservation
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

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
          BEGIN
            select -1 as notexistreservation
          END
          ELSE
          BEGIN
            BEGIN TRANSACTION  
              UPDATE Reservation SET processstatus='Confirmed',confirmationstatus='Confirmed' WHERE NumberReservationn=@NumberReservation
              UPDATE Rom
              SET 
              Rom.statee='Inactive'
              FROM Room Rom
              INNER JOIN
              ReservationDetail RD
              ON RD.NumberRoom = Rom.NumberRoomm
              WHERE RD.NumberReservation=@NumberReservation
              select 1 as confirmsucess
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
    static updateDepartureDateReservation=async(numberreservation,enddate)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
          BEGIN
            select -1 as notexistreservation
          END
          ELSE
          BEGIN   
              IF  EXISTS ( SELECT * FROM Reservation WHERE arrivaldate>=@DepartureDate and NumberReservationn=@NumberReservation)
              BEGIN
                select -2 as dateincorrect
              END
              ELSE
              BEGIN 
                  UPDATE Reservation SET DepartureDate=@DepartureDate
                  WHERE NumberReservationn=@NumberReservation
                  select 1 as confirmsuccess
              END
             
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('NumberReservation', Int,numberreservation)
          .input('DepartureDate', Date,enddate)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistreservation;
          if(resultquery===undefined)
          {
            resultquery = result.recordset[0].dateincorrect;
            if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].confirmsuccess;
              }
             
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
          
            IF NOT  EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
            BEGIN
              select -2 as notexistreservation
            END
            ELSE
            BEGIN
              IF NOT EXISTS ( SELECT * FROM Room WHERE  NumberRoomm=@NumberRoom and Statee='Active')
              BEGIN
                select -3 as notexistroom
              END
              ELSE
              BEGIN
                BEGIN TRANSACTION  

                  INSERT INTO  ReservationDetail
                  SELECT Value,NumberReservationn,NumberRoomm 
                  FROM Reservation,Room			 
                  WHERE NumberRoomm=@NumberRoom and NumberReservationn=@NumberReservation

                  UPDATE Reservation SET Total=Total+Value FROM Reservation,Room
                  WHERE NumberRoomm=@NumberRoom and NumberReservationn=@NumberReservation

                  UPDATE Room SET Room.statee='Inactive' where NumberRoomm=@NumberRoom

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
            END
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
              resultquery = result.recordset[0].notexistreservation;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].notexistroom;
                  if(resultquery===undefined)
                  {
                      resultquery = result.recordset[0].insertsuccess;
                  }
              }
              
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
            select -1 as existreservationdetail
          END
          ELSE
          BEGIN
          
            IF NOT  EXISTS ( SELECT * FROM Reservation WHERE  NumberReservationn=@NumberReservation)
            BEGIN
              select -2 as notexistreservation
            END
            ELSE
            BEGIN
              IF NOT EXISTS ( SELECT * FROM Room WHERE  NumberRoomm=@NumberRoom and Statee='Inactive')
              BEGIN
                select -3 as notexistroom
              END
              ELSE
              BEGIN
                BEGIN TRANSACTION  

                  DELETE FROM ReservationDetail WHERE NumberRoom=@NumberRoom 
                  and NumberReservation=@NumberReservation


                  UPDATE Reservation SET Total=Total-Value FROM Reservation,Room
                  WHERE NumberRoomm=@NumberRoom and NumberReservationn=@NumberReservation

                  UPDATE Room SET Room.statee='Active' where NumberRoomm=@NumberRoom

                  select 1 as deletesuccess 

                  IF(@@ERROR > 0)  
                  BEGIN  
                      ROLLBACK TRANSACTION  
                  END  
                  ELSE  
                  BEGIN  
                     COMMIT TRANSACTION  
                  END  
              END 
            END
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
              resultquery = result.recordset[0].notexistreservation;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].notexistroom;
                  if(resultquery===undefined)
                  {
                      resultquery = result.recordset[0].deletesuccess;
                  }
              }
              
          }
          pool.close();
          return resultquery;
       
    }
    static getDetailReservationMultipleRooms=async(arrayroom,orderby="NumberRoomm")=>//used to reserve rooms
    {
            let array=[];
             let querysearch =
             `
                 SELECT 
                    *, 
                    (
                    select 
                        SUM(value) as total 
                    from 
                        room 
                    where 
                        statee = 'Active' and 
                        numberroomm in (
                            ${
                             this.forinsidestringrooms(arrayroom)
                             }
                        ) 
                    
                    ) as Total 
                    FROM 
                    room 
                    WHERE 
                    numberroomm IN 
                    (
                     ${
                      this.forinsidestringrooms(arrayroom)
                     }
                    ) 
                    AND  statee = 'Active'
                    ORDER BY ${orderby} desc
              
             `

            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
              let detailreservation = new DTOReservationDetail();
              this.getinformationDetailReservationTotal(detailreservation,r);
              array.push(detailreservation);
            } 
           pool.close();
           return array;


     }

    static getDetailReservationByReservation=async(numberreservation,orderby="NumberReservation")=>
     {
             let array=[];
              let querysearch =
              `
              SELECT 
              Reservation.*,
      
              ReservationDetail.NumberRD,
              ReservationDetail.NumberReservation,
              ReservationDetail.NumberRoom,
      
              Room.*
          
              FROM ReservationDetail 
              INNER JOIN Room
              on Room.NumberRoomm=ReservationDetail.NumberRoom
              INNER JOIN Reservation on Reservation.NumberReservationn=ReservationDetail.NumberReservation
              WHERE ReservationDetail.NumberReservation=${numberreservation}
              ORDER BY ${orderby} desc

              
              `
 
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
               let detailreservation = new DTOReservationDetail();
               this.getinformationDetailReservation(detailreservation,r);
               array.push(detailreservation);
             } 
            pool.close();
            return array;
 
 
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
                SELECT * FROM Reservation inner join Passenger
                on Reservation.IDCardPassengerr=Passenger.IDCard
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
              this.getinformationReservation(resr, resultrecordset);
              resultquery=resr
            }
           pool.close();
           return resultquery;
      
    
     }
     
     static getReservationsByRoom=async(numberroom)=>
     {
             let array=[];
             let querysearch = `

             SELECT 
             Reservation.*, 
             Passenger.* 
             FROM 
             Reservation 
             inner join ReservationDetail on Reservation.NumberReservationn = ReservationDetail.NumberReservation
             inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
             where NumberRoom = ${numberroom}
             
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
            return array;
       
     
      }     
     static getReservations=async(orderby="NumberReservationn")=>
     {
              let array=[];
             let querysearch = `

                 SELECT  
                Reservation.*, 
                 Passenger.* 
                 FROM 
                 Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
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
            return array;
       
     
      }
    static getConfirmedReservations=async(orderby="NumberReservationn")=>
      {
               let array=[];
              let querysearch = `

                  SELECT 
                  Reservation.*, 
                 Passenger.* 
                 FROM 
                 Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
                  where ProcessStatus='Confirmed'
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
             return array;
      
       }
    static getPendingReservations=async(orderby="NumberReservationn")=>
       {
                let array=[];
               let querysearch = `   
                  SELECT 
                  Reservation.*, 
                 Passenger.* 
                 FROM 
                 Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
                   where ProcessStatus='Pending'
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
              return array;
         
       
        }
    static getCanceledReservations=async(orderby="NumberReservationn")=>
     {
            let array=[];
             let querysearch = `
             SELECT 
             Reservation.*, 
            Passenger.* 
            FROM 
            Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
            where ProcessStatus='Canceled'
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
            return array;
       
     
      }  
    static getReservationsByPassenger=async(idcardpassenger,orderby="NumberReservationn")=>
      {
               let array=[];
              let querysearch = `

                  SELECT Reservation.*, 
                  Passenger.* 
                  FROM 
                  Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
                   WHERE
                   IDCardPassengerr=@IDCardPassengerr
                  ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('IDCardPassengerr', VarChar, idcardpassenger)
               .query(querysearch)        
               for (var r of result.recordset) {
                 let reserv = new DTOReservation();
                 this.getinformationReservation(reserv,  r);
                 array.push(reserv);
               } 
             pool.close();
             return array;
        
      
       }  
    static getReservationsPendingByPassenger=async(idcardpassenger,orderby="NumberReservationn")=>
       {
              let array=[];
               let querysearch = `
 
               SELECT Reservation.*, 
               Passenger.* 
               FROM 
               Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
               WHERE
                    IDCardPassengerr=@IDCardPassengerr AND ProcessStatus='Pending'
                   ORDER BY ${orderby} desc
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .input('IDCardPassengerr', VarChar, idcardpassenger)
                .query(querysearch)        
                for (var r of result.recordset) {
                  let reserv = new DTOReservation();
                  this.getinformationReservation(reserv,  r);
                  array.push(reserv);
                } 
              pool.close();
              return array;
         
       
        }  
    static getReservationsBetweenReservationDates=async(date1,date2,orderby="NumberReservationn")=>
        {
                let array=[];
                let querysearch = `
  
                SELECT Reservation.*, 
                Passenger.* 
                FROM 
                Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
                WHERE ReservationDate
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
               return array;
          
        
         }  
     static getReservationsBetweenArrivalDates=async(date1,date2,orderby="NumberReservationn")=>
        {
          let array=[];
                let querysearch = `
  
                SELECT Reservation.*, 
                Passenger.* 
                FROM 
                Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
                WHERE ArrivalDate
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
               return  array;
          
        
         } 
     static getReservationsBetweenDepartureDates=async(date1,date2,orderby="NumberReservationn")=>
         {
          let array=[];
                 let querysearch = `
   
                SELECT Reservation.*, 
               Passenger.* 
               FROM 
               Reservation inner join Passenger on Passenger.idcard=Reservation.IDCardPassengerr
               WHERE DepartureDate
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
                return array;
           
         
          } 
          
    static getSearchReservations=async(valueroom1=0,valueroom2=9999,
      numberroom1=0,numberroom2=9999
      ,numberres1=0,numberres2=0,
      processstatus="",origin="",total1=0,total2=99999,idpassenger=""
      ,departdate1='2000-08-08',departdate2='2100-08-08',
      arrdate1='2000-08-08',arrdate2='2100-08-08',
      reservdate1='2000-08-08',reservdate2='2100-08-08',
      orderby="NumberReservationn")=>
          {
                   let array=[];
                  let querysearch = `
   	
                  SELECT 
                  Reservation.*,
                  ReservationDetail.NumberRD,
                  ReservationDetail.NumberReservation,
                  ReservationDetail.NumberRoom,
                  Room.*
                  FROM ReservationDetail 
                  INNER JOIN Room
                  on Room.NumberRoomm=ReservationDetail.NumberRoom
                  INNER JOIN Reservation on Reservation.NumberReservationn=ReservationDetail.NumberReservation
                  WHERE NumberReservationn between ${numberres1} and ${numberres2}
                  and ReservationDate between @reservdate1 and @reservdate2
                  and ArrivalDate between @arrdate1 and @arrdate2 
                  and DepartureDate between  @departdate1  and @departdate2 
                  and ProcessStatus like '%${processstatus}%'
                  and Origin like '%${origin}%'
                  and Total between ${total1} and ${total2}
                  and IDCardPassengerr like '%${idpassenger}%'
                  and ReservationDetail.Value between ${valueroom1} and ${valueroom2}
                  and ReservationDetail.NumberRoom between ${numberroom1} and ${numberroom2}
                  ORDER BY ${orderby} desc
     
                  `
                  let pool = await Conection.conection();
                   const result = await pool.request()
                   .input('reservdate1', Date, reservdate1)
                    .input('reservdate2', Date, reservdate2)
                    .input('arrdate1', Date, arrdate1)
                    .input('arrdate2', Date, arrdate2)
                    .input('departdate1', Date, departdate1)
                    .input('departdate2', Date, departdate2)
                   .query(querysearch)        
                   for (var r of result.recordset) {
                    let detailreservation = new DTOReservationDetail();
                    this.getinformationDetailReservation(detailreservation,r);
                    array.push(detailreservation);
                   } 
                 pool.close();
                 return array;
            
          
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
   static getinformationDetailReservation(detailreservation, result) {

    detailreservation.NumberRD=result.NumberRD;
    DataReservation.getinformationReservation(detailreservation.Reservation,result)
    DataRoom.getinformation(detailreservation.Room,result)

   }

   //#region Others

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

        UPDATE room set statee='Inactive' where numberroomm=${element.Room.NumberRoomm}

        `
      
     
    }
    return stringelement
   
   }
   static forInactiveRoomRservationOnline(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
     

        stringelement=stringelement+
        `
        UPDATE room set statee='Inactive' where numberroomm=${element.Room.NumberRoomm}

        `
      
     
    }
    return stringelement
   
   }
   //#endregion
}
module.exports = { DataReservation };