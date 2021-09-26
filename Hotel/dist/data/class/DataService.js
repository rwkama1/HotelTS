"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOService_1 = require("../../shared/entity/DTOService");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataService {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataService.instancia) {
            DataService.instancia = new DataService();
        }
        return DataService.instancia;
    }
    registerService = async (dtoservice) => {
        try {
            let queryinsert = "insert into Servicee values (@NameS,@Value,'Active')";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NameS', mssql_1.VarChar, dtoservice.name)
                .input('Value', mssql_1.Money, dtoservice.value)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateService = async (dtoservice) => {
        try {
            let queryupdate = "Update Servicee Set NameS=@NameS,Value=@Value where IDService=@IDService";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDService', mssql_1.Int, dtoservice.idservice)
                .input('NameS', mssql_1.VarChar, dtoservice.name)
                .input('Value', mssql_1.Money, dtoservice.value)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    changeStateService = async (idservice, state) => {
        try {
            let queryupdate = "Update Servicee Set Statee=@Statee where IDService=@IDService";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('IDService', mssql_1.Int, idservice)
                .input('Statee', mssql_1.VarChar, state)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getServices = async () => {
        try {
            let queryget = "select * from Servicee";
            let pool = await Conection_1.Conection.conection();
            let arrays = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let s = new DTOService_1.default(x.IDService, x.NameS, x.Value, x.Statee);
                arrays.push(s);
            }
            pool.close();
            return arrays;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataService;
//# sourceMappingURL=DataService.js.map