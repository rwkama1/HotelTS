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
    //#region CUD
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
    //#endregion
    //#region SEARCH
    getPassengerbyID = async (idcard) => {
        let pool = await Conection_1.Conection.conection();
        var dtopassenger = null;
        try {
            let queryget = `select * from Passenger where idcard=@IDCard`;
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, idcard)
                .query(queryget);
            dtopassenger = new DTOPassenger_1.default(result.recordset[0].IDCard, result.recordset[0].Names, result.recordset[0].LastName, result.recordset[0].Country, result.recordset[0].Town, result.recordset[0].Addresss, result.recordset[0].PhoneNumber, result.recordset[0].Mail, result.recordset[0].Salt, result.recordset[0].Passwordd, result.recordset[0].Statee);
            return dtopassenger;
        }
        catch (e) {
            return dtopassenger;
        }
        finally {
            pool.close();
        }
    };
    getPassengerSearch = async (idcard, name, LastName, country, town, phonenumber, address, mail) => {
        try {
            let queryget = `SELECT *
         FROM passenger
         WHERE  idcard LIKE '%${idcard}%'
                AND names LIKE '%${name}%'
                AND lastname LIKE '%${LastName}%'
                AND country LIKE '%${country}%'
                AND town LIKE '%${town}%'
                AND phonenumber LIKE '%${phonenumber}%'
                AND addresss LIKE '%${address}%'
                AND mail LIKE '%${mail}%'
                AND statee='Active'`;
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let passenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(passenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    //#endregion
    //#region LISTS
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
            throw new dataexception_1.DataException("An error occurred related to the user database: " + e.message);
        }
    };
    getPassengerActives = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active'";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    getUsersInactive = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Inactive'";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyIdCardDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by IDCard desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyNameDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by Names desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:   " + e.message);
        }
    };
    SortbyNameAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by Names asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyAddressDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by Addresss desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyAddressAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by Addresss asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyPhoneDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by PhoneNumber desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyPhoneAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by PhoneNumber asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database: " + e.message);
        }
    };
    SortbyCountryDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by country desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyCountryAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by country asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbymailDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by mail desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database: " + e.message);
        }
    };
    SortbyMailAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by mail asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database: " + e.message);
        }
    };
    SortbyTownDesc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by town desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
    SortbyTownAsc = async () => {
        try {
            let queryget = "select * from Passenger where Statee='Active' order by town asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let dtopassenger = new DTOPassenger_1.default(x.IDCard, x.Names, x.LastName, x.Country, x.Town, x.Addresss, x.PhoneNumber, x.Mail, x.Salt, x.Passwordd, x.Statee);
                arrayu.push(dtopassenger);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("A error occurred related to the passenger database:" + e.message);
        }
    };
}
exports.default = DataPassenger;
//# sourceMappingURL=DataPassenger.js.map