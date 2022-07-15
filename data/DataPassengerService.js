const { VarChar,Int, Money ,Date} = require("mssql");
const { DTODetailPassengerService } = require("../DTO/DTODetailPassengerService");
const { DTOPassengerService } = require("../DTO/DTOPassengerService");


const { Conection } = require("./Conection");
const { DataPassenger } = require("./DataPassenger");
const { DataService } = require("./DataService");

class DataPassengerService
{
    //#region CRUD

    static registerPassengerService=async(idcardpassenger,startdate,enddate,total,observation,arraydetailps)=>
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
                insert into PassengerServicee values (@IDCard,@startdate,@enddate,@Total,@observation)
                  ${this.forAddDetailPS(arraydetailps)}
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
          .input('startdate', Date, startdate)
          .input('enddate', Date, enddate)
          .input('observation', VarChar, observation)
          .input('Total', Money, total)
          .query(queryinsert)
          resultquery = result.recordset[0].notexistpassenger;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].insertsuccess;
          }
          pool.close();
          return resultquery;
  
    }
    static updateEndDatePassengerService=async(idpassengerservice,enddate)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM PassengerServicee WHERE  numberps=@numberps)
          BEGIN
            select -1 as notexistps
          END
          ELSE
          BEGIN   
              IF  EXISTS ( SELECT * FROM PassengerServicee WHERE startdate>=@enddate and numberps=@numberps)
              BEGIN
                select -2 as dateincorrect
              END
              ELSE
              BEGIN 
                  UPDATE PassengerServicee SET enddate=@enddate
                  WHERE numberps=@numberps
                  select 1 as confirmsuccess
              END
             
          END

          `;
          let pool = await Conection.conection();
         
          const result = await pool.request()
          .input('numberps', Int,idpassengerservice)
          .input('enddate', Date,enddate)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistps;
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
    
    //#endregion
    //#region  Detail Passenger Services

    static addDetailPS=async(numberps,idservice)=>
    {
          let resultquery;
          let queryupdate = `

          IF EXISTS ( SELECT * FROM DetailPassengerService WHERE IdServicee=@idservice and numberpservice=@numberps)
          BEGIN
            select -1 as existdetailps
          END
          ELSE
          BEGIN
          
            IF NOT  EXISTS ( SELECT * FROM PassengerServicee WHERE  numberps=@numberps)
            BEGIN
              select -2 as notexistpassengerservice
            END
            ELSE
            BEGIN
              IF NOT EXISTS ( SELECT * FROM servicee WHERE  idservice=@idservice and Statee='Active')
              BEGIN
                select -3 as notexistservice
              END
              ELSE
              BEGIN
                BEGIN TRANSACTION  

                  INSERT INTO  DetailPassengerService
                  SELECT numberps,idservice,value 
                  FROM PassengerServicee,servicee			 
                  WHERE idservice=@idservice and numberps=@numberps

                  UPDATE PassengerServicee SET Total=Total+Value FROM PassengerServicee,Servicee
                  WHERE idservice=@idservice and numberps=@numberps


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
          .input('idservice', Int, idservice)
          .input('numberps', Int,numberps)
         
          .query(queryupdate)
          resultquery = result.recordset[0].existdetailps;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].notexistpassengerservice;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].notexistservice;
                  if(resultquery===undefined)
                  {
                      resultquery = result.recordset[0].insertsuccess;
                  }
              }
              
          }
          pool.close();
          return resultquery;
       
    } 
    static removeDetailPS=async(numberps,idservice)=>
    {
          let resultquery;
          let queryupdate = `

          IF NOT EXISTS ( SELECT * FROM DetailPassengerService WHERE idservicee=@idservice and numberpservice=@numberps)
          BEGIN
            select -1 as notexistdetailps
          END
          ELSE
          BEGIN
          
            IF NOT EXISTS ( SELECT * FROM PassengerServicee WHERE  numberps=@numberps)
            BEGIN
              select -2 as noexistpservice
            END
            ELSE
            BEGIN
              IF NOT EXISTS ( SELECT * FROM servicee WHERE  idservice=@idservice and Statee='Active')
              BEGIN
                select -3 as notexistservice
              END
              ELSE
              BEGIN
                BEGIN TRANSACTION  

                  DELETE FROM DetailPassengerService WHERE idservicee=@idservice 
                  and numberpservice=@numberps


                  UPDATE PassengerServicee SET Total=Total-Value FROM PassengerServicee,servicee
                  WHERE idservice=@idservice and numberps=@numberps

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
          .input('idservice', Int, idservice)
          .input('numberps', Int,numberps)
          .query(queryupdate)
          resultquery = result.recordset[0].notexistdetailps;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].noexistpservice;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].notexistservice;
                  if(resultquery===undefined)
                  {
                      resultquery = result.recordset[0].deletesuccess;
                  }
              }
              
          }
          pool.close();
          return resultquery;
       
    }
    static getDetailPSByPassengerService=async(numberps,orderby="iddpassangerservice")=>
    {
            let array=[];
             let querysearch =
             `
             SELECT 
             PassengerServicee.*,
     
             DetailPassengerService.IDDPassangerService,
             DetailPassengerService.numberpservice,
             DetailPassengerService.idservicee,
     
             Servicee.*
         
             FROM DetailPassengerService 
             INNER JOIN Servicee
             on Servicee.idservice=DetailPassengerService.idservicee
             INNER JOIN PassengerServicee on PassengerServicee.numberps=DetailPassengerService.numberpservice
             WHERE DetailPassengerService.numberpservice=${numberps}
             ORDER BY ${orderby} desc

             
             `

            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)
             for (var r of result.recordset) {
               let dtodps = new DTODetailPassengerService();
             this.getinformationDetailPS(dtodps,r);
             array.push(dtodps);
             
            } 
           pool.close();
           return array;


     }
    static getMultipleDetailPassengerServices=async(arrayservices,orderby="idservice")=>
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
                         servicee 
                     where 
                         statee = 'Active' and 
                         idservice in (
                             ${
                              this.forinsidestring(arrayservices)
                              }
                         ) 
                     
                     ) as Total 
                     FROM 
                     servicee 
                     WHERE 
                     idservice IN 
                     (
                      ${
                       this.forinsidestring(arrayservices)
                      }
                     ) 
                     AND  statee = 'Active'
                     ORDER BY ${orderby} desc
               
              `
 
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
               let dtodps = new DTODetailPassengerService();
               this.getinformationDetailPSTotal(dtodps,r);
               array.push(dtodps);
             } 
            pool.close();
            return array;
 
 
      }

    //#endregion
    //#region GETS

    static getPassengerService=async(numberps)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM PassengerServicee WHERE numberps=@numberps)
            BEGIN
              select -1 as notexistpassengerservice
            END
            ELSE
            BEGIN
                SELECT * FROM PassengerServicee inner join Passenger
                on PassengerServicee.idcardp=Passenger.IDCard
                WHERE numberps=@numberps
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('numberps', Int, numberps)
             .query(querysearch)
            resultquery = result.recordset[0].notexistpassengerservice; 
            if (resultquery===undefined) {
             let resultrecordset=result.recordset[0];
              let ps = new DTOPassengerService();
              this.getinformationPS(ps, resultrecordset);
              resultquery=ps
            }
           pool.close();
           return resultquery;
      
    
     }


     
    static getPassengerServicesMultipleNumber=async(arraynumberps,orderby="numberps")=>
    {
             let array=[];
            let querysearch = `

                SELECT  
                PassengerServicee.*, 
                Passenger.* 
                FROM 
                PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.IDCardP
                WHERE numberps in
                (
                  ${
                    this.forinsidestring(arraynumberps)
                    }
                )

                ORDER BY ${orderby} desc

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .query(querysearch)        
             for (var ps of result.recordset) {
               let dtops  = new DTOPassengerService();
               this.getinformationPS(dtops,ps);
               array.push(dtops);
             } 
           pool.close();
           return array;
      
    
     }
    static getPassengerServices=async(orderby="numberps")=>
      {
               let array=[];
              let querysearch = `
 
                  SELECT  
                  PassengerServicee.*, 
                  Passenger.* 
                  FROM 
                  PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.IDCardP
                  ORDER BY ${orderby} desc
 
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)        
               for (var ps of result.recordset) {
                 let dtops  = new DTOPassengerService();
                 this.getinformationPS(dtops,ps);
                 array.push(dtops);
               } 
             pool.close();
             return array;
        
      
       }
    static getPassengerServiceByService=async(idservice)=>
       {
               let array=[];
               let querysearch = `
  
               SELECT 
               PassengerServicee.*, 
               Passenger.* 
               FROM 
               PassengerServicee 
               inner join DetailPassengerService on PassengerServicee.numberps = DetailPassengerService.numberpservice
               inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
               where idservicee = ${idservice}
               
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .query(querysearch)        
                for (var ps of result.recordset) {
                  let dtops  = new DTOPassengerService();
                  this.getinformationPS(dtops,ps);
                  array.push(dtops);
                } 
              pool.close();
              return array;
         
       
    } 
    static getPassengerServiceByPassenger=async(idcardpassenger,orderby="numberps")=>
    {
             let array=[];
            let querysearch = `

                SELECT 
                PassengerServicee.*, 
                 Passenger.* 
                FROM 
                PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
                 WHERE
                 idcardp=@IDCardPassengerr
                ORDER BY ${orderby} desc
            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('IDCardPassengerr', VarChar, idcardpassenger)
             .query(querysearch)        
             for (var ps of result.recordset) {
              let dtops  = new DTOPassengerService();
              this.getinformationPS(dtops,ps);
              array.push(dtops);
            } 
           pool.close();
           return array;
      
    
     } 
     static getPassengerServiceBetweenStartDate=async(date1,date2,orderby="numberps")=>
     {
             let array=[];
             let querysearch = `

             SELECT 
             PassengerServicee.*, 
             Passenger.* 
             FROM 
             PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
             WHERE startdate
             BETWEEN  @Date1 and @Date2 
             ORDER BY ${orderby} desc
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .input('Date1', Date, date1)
              .input('Date2', Date, date2)
              .query(querysearch)        
              for (var ps of result.recordset) {
                let dtops  = new DTOPassengerService();
                this.getinformationPS(dtops,ps);
                array.push(dtops);
              } 
            pool.close();
            return  array;
       
     
      } 
    static getPassengerServiceBetweenEndDate=async(date1,date2,orderby="numberps")=>
      {
              let array=[];
              let querysearch = `
 
              SELECT 
              PassengerServicee.*, 
              Passenger.* 
              FROM 
              PassengerServicee inner join Passenger on Passenger.idcard=PassengerServicee.idcardp
              WHERE enddate
              BETWEEN  @Date1 and @Date2 
              ORDER BY ${orderby} desc
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .input('Date1', Date, date1)
               .input('Date2', Date, date2)
               .query(querysearch)        
               for (var ps of result.recordset) {
                 let dtops  = new DTOPassengerService();
                 this.getinformationPS(dtops,ps);
                 array.push(dtops);
               } 
             pool.close();
             return  array;
        
      
       } 
    static getSearchPassengerService=async(
      valueservice1=0,valueservice2=99999,
      idservice1=0,idservice2=9999,
      numberps1=0,numberps2=9999,idpassenger="",startdate1='2000-08-08',
      startdate2='2100-08-08',enddate1='2000-08-08',
      enddate2='2100-08-08',total1=0,total2=99999
      ,orderby="numberps")=>
       {
               let array=[];
                let querysearch =
                `
                SELECT 
                PassengerServicee.*,
        
                DetailPassengerService.IDDPassangerService,
                DetailPassengerService.numberpservice,
                DetailPassengerService.idservicee,
        
                Servicee.*
            
                FROM DetailPassengerService 
                INNER JOIN Servicee
                on Servicee.idservice=DetailPassengerService.idservicee
                INNER JOIN PassengerServicee on PassengerServicee.numberps=DetailPassengerService.numberpservice
                WHERE
                NumberPS between ${numberps1} and ${numberps2}
                and IDCardP like '%${idpassenger}%'
                and StartDate between @startdate1 and @startdate2 
                and EndDate between  @enddate1 and @enddate2 
                and Total between ${total1} and ${total2}
                and DetailPassengerService.Amount between ${valueservice1} and ${valueservice2}
                and DetailPassengerService.IDServicee between ${idservice1} and ${idservice2}
                ORDER BY ${orderby} desc
                `
   
               let pool = await Conection.conection();
                const result = await pool.request()
                .input('startdate1', Date, startdate1)
                .input('startdate2', Date, startdate2)
                .input('enddate1', Date, enddate1)
                .input('enddate2', Date, enddate2)
                .query(querysearch)
                for (var r of result.recordset) {
                  let dtodps = new DTODetailPassengerService();
                this.getinformationDetailPS(dtodps,r);
                array.push(dtodps);
                
               } 
              pool.close();
              return array;
   
   
        }
    
    //#endregion

   //#region GET INFORMATION

   static getinformationPS(passengerservice, result) {

    
    passengerservice.NumberPS=result.NumberPS;
    passengerservice.StartDate=result.StartDate;
    passengerservice.EndDate=result.EndDate;
    passengerservice.Total=result.Total;
    passengerservice.Observations=result.Observations;
    DataPassenger.getinformation(passengerservice.Passenger,result)
    
   }
   static getinformationDetailPS(detailps, result) {

    detailps.IDDPassangerService=result.IDDPassangerService;
    this.getinformationPS(detailps.PassengerService,result)
    DataService.getinformation(detailps.Servicee,result)
    detailps.Amount=detailps.Servicee.value;
   }
   static getinformationDetailPSTotal(detailps, result) {

    detailps.Total=result.Total;
    detailps.Amount=result.Amount;
    detailps.PassengerService=null;
    DataService.getinformation(detailps.Servicee,result)

   }
   //#endregion

   //#region OTHERS

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
   static forAddDetailPS(array)
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
     

        stringelement=stringelement+
        `
        insert into DetailPassengerService values (IDENT_CURRENT('PassengerServicee'),
        ${element.Servicee.idservice},${element.Servicee.value})

        `
      
     
    }
    return stringelement
   
   }
   //#endregion
}
module.exports = { DataPassengerService };