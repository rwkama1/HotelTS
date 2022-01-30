"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOUser_1 = require("../../shared/entity/DTOUser");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataUser {
    //#region SINGLETON
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataUser.instancia) {
            DataUser.instancia = new DataUser();
        }
        return DataUser.instancia;
    }
    //#endregion
    //#region  CUD
    registerUser = async (dtuser) => {
        try {
            let queryinsert = "insert into Users values (@IDCard,@NamesUser,@LastName,@Addresss,@PhoneNumber,@TypeUser,@Hashh,'Active',@PasswordUser,@Mail)";
            let pool = await Conection_1.Conection.conection();
            //   let sqltools=Conection.sqlserver();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtuser.idcard)
                .input('NamesUser', mssql_1.VarChar, dtuser.name)
                .input('LastName', mssql_1.VarChar, dtuser.surname)
                .input('Addresss', mssql_1.VarChar, dtuser.address)
                .input('PhoneNumber', mssql_1.VarChar, dtuser.phone)
                .input('TypeUser', mssql_1.VarChar, dtuser.typeuserr)
                .input('PasswordUser', mssql_1.VarChar, dtuser.password)
                .input('Hashh', mssql_1.VarChar, dtuser.hashh)
                .input('Mail', mssql_1.VarChar, dtuser.maill)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    updateUser = async (dtuser) => {
        try {
            let queryupdate = "Update Users Set NamesUser=@NamesUser,LastName=@LastName,Addresss=@Addresss,PhoneNumber=@PhoneNumber,TypeUser=@TypeUser,PasswordUser=@PasswordUser,Hashh=@Hashh,Mail=@Mail where IDCard=@IDCard";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, dtuser.idcard)
                .input('NamesUser', mssql_1.VarChar, dtuser.name)
                .input('LastName', mssql_1.VarChar, dtuser.surname)
                .input('Addresss', mssql_1.VarChar, dtuser.address)
                .input('PhoneNumber', mssql_1.VarChar, dtuser.phone)
                .input('TypeUser', mssql_1.VarChar, dtuser.typeuserr)
                .input('PasswordUser', mssql_1.VarChar, dtuser.password)
                .input('Hashh', mssql_1.VarChar, dtuser.hashh)
                .input('Mail', mssql_1.VarChar, dtuser.maill)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    changeStateUser = async (idcard, state) => {
        try {
            let queryupdate = "Update Users Set Statee=@Statee where IDCard=@IDCard";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, idcard)
                .input('Statee', mssql_1.VarChar, state)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    //#endregion
    //#region LISTS
    getUsers = async () => {
        try {
            let queryget = "select * from Users";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    getUsersActive = async () => {
        try {
            let queryget = "select * from Users where Statee='Active'";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    getUsersInactive = async () => {
        try {
            let queryget = "select * from Users where Statee='Inactive'";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyIdCardDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by IDCard desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyNameDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by NamesUser desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyNameAsc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by NamesUser asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyAddressDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by Addresss desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyAddressAsc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by Addresss asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyPhoneDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by PhoneNumber desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyPhoneAsc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by PhoneNumber asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyTypeUserDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by typeuser desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyTypeUserAsc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by typeuser asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbymailDesc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by mail desc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    SortbyMailAsc = async () => {
        try {
            let queryget = "select * from Users where Statee='Active' order by mail asc";
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
    //#endregion
    //#region SEARCH
    getUserbyID = async (idcard) => {
        let pool = await Conection_1.Conection.conection();
        var dtouser = null;
        try {
            let queryget = `select * from Users where idcard=@IDCard`;
            const result = await pool.request()
                .input('IDCard', mssql_1.VarChar, idcard)
                .query(queryget);
            dtouser = new DTOUser_1.default(result.recordset[0].IDCard, result.recordset[0].NamesUser, result.recordset[0].LastName, result.recordset[0].Addresss, result.recordset[0].PhoneNumber, result.recordset[0].TypeUser, result.recordset[0].PasswordUser, result.recordset[0].Hashh, result.recordset[0].Mail, result.recordset[0].Statee);
            return dtouser;
        }
        catch (e) {
            return dtouser;
        }
        finally {
            pool.close();
        }
    };
    getUsersSearch = async (idcard, typeuser, phonenumber, address, mail) => {
        try {
            let queryget = `SELECT *
        FROM   users
        WHERE  idcard LIKE '%${idcard}%'
               AND typeuser LIKE '%${typeuser}%'
               AND phonenumber LIKE '%${phonenumber}%'
               AND addresss LIKE '%${address}%'
               AND mail LIKE '%${mail}%'
               AND statee='Active'`;
            let pool = await Conection_1.Conection.conection();
            let arrayu = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let user = new DTOUser_1.default(x.IDCard, x.NamesUser, x.LastName, x.Addresss, x.PhoneNumber, x.TypeUser, x.PasswordUser, x.Hashh, x.Mail, x.Statee);
                arrayu.push(user);
            }
            pool.close();
            return arrayu;
        }
        catch (e) {
            throw new dataexception_1.DataException("An error occurred related to the user database:   " + e.message);
        }
    };
}
exports.default = DataUser;
//# sourceMappingURL=DataUser.js.map