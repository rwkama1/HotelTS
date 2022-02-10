
import { DataException } from "../shared/exceptions/dataexception";
import {ConnectionPool}  from "mssql";

export class Conection
{
    static conection=async () => {
        let sqlconfig = {
            user: 'rwkama63_SQLLogin_1',
            password:'67bu3zb26y',
            database: 'BDHotelReservation',
            server: 'BDHotelReservation.mssql.somee.com',
           
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        try {
       
        const pool = await new ConnectionPool(sqlconfig).connect();
       return pool
        } catch (err) {
            throw new DataException("Conection error: "+err.message);
        
        }
       }
}

