"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTODPassengerService_1 = require("../../shared/entity/DTODPassengerService");
const DTOPassengerService_1 = require("../../shared/entity/DTOPassengerService");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataPassengerService {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataPassengerService.instancia) {
            DataPassengerService.instancia = new DataPassengerService();
        }
        return DataPassengerService.instancia;
    }
    registerPassengerService = async (dtopservice) => {
        try {
            let queryinsert = "insert into PassengerServicee values (@NumberPS,@IDCardP,@StartDate,@EndDate,@Total,@Observations)";
            let queryinsert2 = "insert into DetailPassengerService values (@IDDPassangerService,@NumberPService,@IDServicee,@Amount)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberPS', mssql_1.Int, dtopservice.numberps)
                .input('IDCardP', mssql_1.VarChar, dtopservice.idcardp)
                .input('StartDate', mssql_1.Date, dtopservice.startdate)
                .input('EndDate', mssql_1.Date, dtopservice.enddate)
                .input('Total', mssql_1.Money, dtopservice.total)
                .input('Observations', mssql_1.VarChar, dtopservice.observations)
                .query(queryinsert);
            for (let detailr of dtopservice.listdetailps) {
                const result2 = await pool.request()
                    .input('IDDPassangerService', mssql_1.Int, detailr.numberdetailps)
                    .input('NumberPService', mssql_1.Int, dtopservice.numberps)
                    .input('IDServicee', mssql_1.Int, detailr.idservice)
                    .input('Amount', mssql_1.Money, detailr.amount)
                    .query(queryinsert2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    listPassengersServices = async () => {
        try {
            let queryget = "select * from PassengerServicee";
            let pool = await Conection_1.Conection.conection();
            let arraypassengerservice = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let passengerservices = new DTOPassengerService_1.default(x.NumberPS, x.IDCardP, x.StartDate, x.EndDate, x.Total, x.Observations, await this.getDPS(x.NumberPS));
                arraypassengerservice.push(passengerservices);
            }
            pool.close();
            return arraypassengerservice;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getDPS = async (idps) => {
        try {
            let queryget = "select * from DetailPassengerService where NumberPService=@NumberPService";
            let pool = await Conection_1.Conection.conection();
            let arraydpassengerservice = [];
            const result = await pool.request()
                .input('NumberPService', mssql_1.Int, idps)
                .query(queryget);
            for (let x of result.recordset) {
                let detailps = new DTODPassengerService_1.default(x.IDDPassangerService, x.IDServicee, x.Amount);
                arraydpassengerservice.push(detailps);
            }
            pool.close();
            return arraydpassengerservice;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    addDPS = async (dtopservice) => {
        let listdtrlength = dtopservice.listdetailps.length;
        let queryinsert2 = "insert into DetailPassengerService values (@IDDPassangerService,@NumberPService,@IDServicee,@Amount)";
        try {
            let pool = await Conection_1.Conection.conection();
            const result2 = await pool.request()
                .input('IDDPassangerService', mssql_1.Int, dtopservice.listdetailps[listdtrlength - 1].numberdetailps)
                .input('NumberPService', mssql_1.Int, dtopservice.numberps)
                .input('IDServicee', mssql_1.Int, dtopservice.listdetailps[listdtrlength - 1].idservice)
                .input('Amount', mssql_1.Money, dtopservice.listdetailps[listdtrlength - 1].amount)
                .query(queryinsert2);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateTotalPS = async (dtopservice) => {
        let queryupdate = "Update PassengerServicee Set Total=@Total where NumberPS=@NumberPS";
        try {
            let pool = await Conection_1.Conection.conection();
            const result2 = await pool.request()
                .input('NumberPS', mssql_1.Int, dtopservice.numberps)
                .input('Total', mssql_1.Money, dtopservice.total)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataPassengerService;
//# sourceMappingURL=DataPassengerService.js.map