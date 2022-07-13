const { Money, VarChar, Int } = require("mssql");
const { DTOService } = require("../DTO/DTOService");
const { Conection } = require("./Conection");

class DataService
{
    //#region CRUD

    static registerService=async(names,value)=>
      {
       
            let queryinsert = ` 
                insert into Servicee values (@NameS,@Value,'Active')
            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('NameS', VarChar, names)
            .input('Value', Money, value)
            .query(queryinsert)
            pool.close();
            return true;
    
      }
    static updateService=async(idservice,value,names)=>
      {
            let resultquery;
            let queryinsert = `

            IF NOT EXISTS ( SELECT * FROM Servicee WHERE IDService=@IDService and Statee='Active')
            BEGIN
              select -1 as notexistservicee
            END
            ELSE
            BEGIN
              Update Servicee Set NameS=@NameS,Value=@Value where IDService=@IDService
              select 1 as updatesucess

            END

            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDService', Int, idservice)
            .input('Value', Money, value)
            .input('NameS', VarChar, names)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistservicee;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].updatesucess;
            }
            pool.close();
            return resultquery;
    
      }
    static disableService=async(idservice)=>
      {
            let resultquery;
            let queryinsert = `

            IF NOT EXISTS ( SELECT * FROM Servicee WHERE IDService=@IDService and Statee='Active')
            BEGIN
              select -1 as notexistservicee
            END
            ELSE
            BEGIN
              Update Servicee Set Statee='Inactive' where IDService=@IDService
              select 1 as disablesucess

            END

            `;
            let pool = await Conection.conection();
            const result = await pool.request()
            .input('IDService', Int, idservice)
            .query(queryinsert)
            resultquery = result.recordset[0].notexistservicee;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].disablesucess;
            }
            pool.close();
            return resultquery;
    
      }

    //#endregion

    //#region GETS
      
    static getService=async(idservice)=>
    {
            let resultquery;
            let querysearch = `

            IF NOT EXISTS ( SELECT * FROM Servicee WHERE idservice=@idservice and Statee='Active')
            BEGIN
              select -1 as noexistservice
            END
            ELSE
            BEGIN
                SELECT * FROM Servicee
                WHERE idservice=@idservice and Statee='Active'
            END

            `
            let pool = await Conection.conection();
             const result = await pool.request()
             .input('idservice', Int, idservice)
             .query(querysearch)
            resultquery = result.recordset[0].noexistservice; 
            if (resultquery===undefined) {
              let resultrecordset=result.recordset[0];
              let service = new DTOService();
              this.getinformation(service, resultrecordset);
              resultquery=service
            }
           pool.close();
           return resultquery;
      
    
     }

     static getServices=async(orderby="idservice")=>
     {
             let array=[];
             let querysearch = `
 
                SELECT * FROM Servicee WHERE Statee='Active'
                ORDER BY ${orderby} desc
 
             `
             let pool = await Conection.conection();
              const result = await pool.request()
              .query(querysearch)
              for (var r of result.recordset) {
               let service = new DTOService();
               this.getinformation(service,  r);
               array.push(service);
             } 
            pool.close();
            return array;
       
     
      }
    static getServicesMultipleID=async(arrayservices,orderby="idservice")=>
      {
              let array=[];
              let querysearch = `
  
                 SELECT * FROM Servicee
                  WHERE Statee='Active' and 
                  idservice in (
                    ${
                      this.forinsidestring(arrayservices)
                    }
                    )
                 ORDER BY ${orderby} desc
  
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)
               for (var r of result.recordset) {
                let service = new DTOService();
                this.getinformation(service,  r);
                array.push(service);
              } 
             pool.close();
             return array;
        
      
       }

      static getServicesBetweenValues=async(value1=0,value2=9999,orderby="idservice")=>
      {
              let array=[];
              let querysearch = `
  
                 SELECT * FROM Servicee 
                 WHERE 
                 Value between ${value1} AND ${value2}
                  AND
                 Statee='Active'
                 ORDER BY ${orderby} desc
  
              `
              let pool = await Conection.conection();
               const result = await pool.request()
               .query(querysearch)
               for (var r of result.recordset) {
                let service = new DTOService();
                this.getinformation(service,  r);
                array.push(service);
              } 
             pool.close();
             return array;
        
      
       }
       static getSearchServices=async(name="",value1=0,value2=99999,orderby="idservice")=>
       {
               let array=[];
               let querysearch = `
   
                  SELECT * FROM Servicee WHERE Statee='Active'
                  AND  NameS LIKE '%${name}%' 
                  AND Value BETWEEN ${value1} AND ${value2} 
                  ORDER BY ${orderby} desc
   
               `
               let pool = await Conection.conection();
                const result = await pool.request()
                .query(querysearch)
                for (var r of result.recordset) {
                 let service = new DTOService();
                 this.getinformation(service,  r);
                 array.push(service);
               } 
              pool.close();
              return array;
         
       
        }

    //#endregion
    //#region  Get Information

    static getinformation(service, result) {

      service.idservice = result.IDService;
      service.name= result.NameS;
      service.value = result.Value;
      service.statee = result.Statee;
     
  
     }
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
module.exports = { DataService };