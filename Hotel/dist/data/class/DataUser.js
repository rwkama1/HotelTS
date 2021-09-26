"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOUser_1 = require("../../shared/entity/DTOUser");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataUser {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataUser.instancia) {
            DataUser.instancia = new DataUser();
        }
        return DataUser.instancia;
    }
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
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
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
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
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
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
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
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataUser;
//# sourceMappingURL=DataUser.js.map