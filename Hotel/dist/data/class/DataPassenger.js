"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOPassenger_1 = require("../../shared/entity/DTOPassenger");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataPassenger {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataPassenger.instancia) {
            DataPassenger.instancia = new DataPassenger();
        }
        return DataPassenger.instancia;
    }
    registerPassenger = async (dtopassenger) => {
        try {
            let queryinsert = "insert into Passenger values (@IDCard,@Names,@LastName,@Country,@Town,@Addresss,@PhoneNumber,@Mail,@Salt,@Passwordd,'Active')";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtopassenger.idcard)
                .input('Names', mssql_1.VarChar, dtopassenger.name)
                .input('LastName', mssql_1.VarChar, dtopassenger.surname)
                .input('Country', mssql_1.VarChar, dtopassenger.country)
                .input('Town', mssql_1.VarChar, dtopassenger.town)
                .input('Addresss', mssql_1.VarChar, dtopassenger.address)
                .input('PhoneNumber', mssql_1.VarChar, dtopassenger.phone)
                .input('Mail', mssql_1.VarChar, dtopassenger.maill)
                .input('Salt', mssql_1.VarChar, dtopassenger.salt)
                .input('Passwordd', mssql_1.VarChar, dtopassenger.password)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updatePassenger = async (dtopassenger) => {
        try {
            let queryupdate = "Update Passenger Set Names=@Names,LastName=@LastName,Country=@Country,Town=@Town,Addresss=@Addresss,PhoneNumber=@PhoneNumber,Mail=@Mail,Salt=@Salt,Passwordd=@Passwordd where IDCard=@IDCard";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtopassenger.idcard)
                .input('Names', mssql_1.VarChar, dtopassenger.name)
                .input('LastName', mssql_1.VarChar, dtopassenger.surname)
                .input('Country', mssql_1.VarChar, dtopassenger.country)
                .input('Town', mssql_1.VarChar, dtopassenger.town)
                .input('Addresss', mssql_1.VarChar, dtopassenger.address)
                .input('PhoneNumber', mssql_1.VarChar, dtopassenger.phone)
                .input('Mail', mssql_1.VarChar, dtopassenger.maill)
                .input('Salt', mssql_1.VarChar, dtopassenger.salt)
                .input('Passwordd', mssql_1.VarChar, dtopassenger.password)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    changeStatePassenger = async (idcard, state) => {
        try {
            let queryupdate = "Update Passenger Set Statee=@Statee where IDCard=@IDCard";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, idcard)
                .input('Statee', mssql_1.VarChar, state)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getPassengers = async () => {
        try {
            let queryget = "select * from Passenger";
            let pool = await Conection_1.Conection.conection();
            let arraypassenger = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let passenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arraypassenger.push(passenger);
            }
            pool.close();
            return arraypassenger;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataPassenger;
//# sourceMappingURL=DataPassenger.js.map