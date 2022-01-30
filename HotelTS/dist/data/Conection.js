"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conection = void 0;
const dataexception_1 = require("../shared/exceptions/dataexception");
const mssql_1 = require("mssql");
class Conection {
    static conection = async () => {
        let sqlconfig = {
            user: 'rwkama63_SQLLogin_1',
            password: '67bu3zb26y',
            database: 'BDHotelReservation',
            server: 'BDHotelReservation.mssql.somee.com',
            options: {
                trustedConnection: false,
                enableArithAbort: true,
                encrypt: false
            }
        };
        try {
            const pool = await new mssql_1.ConnectionPool(sqlconfig).connect();
            return pool;
        }
        catch (err) {
            throw new dataexception_1.DataException("Conection error: " + err.message);
        }
    };
}
exports.Conection = Conection;
//# sourceMappingURL=Conection.js.map