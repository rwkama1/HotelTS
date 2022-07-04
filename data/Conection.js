const sql  = require("mssql");

 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama62_SQLLogin_1',
            password:'15mo637g1o',
            database: 'hoteljs',
            server: 'hoteljs.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };