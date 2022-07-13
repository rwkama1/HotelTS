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