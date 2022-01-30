"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOPayment_1 = require("../../shared/entity/DTOPayment");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataPayment {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataPayment.instancia) {
            DataPayment.instancia = new DataPayment();
        }
        return DataPayment.instancia;
    }
    getPayments = async () => {
        try {
            let queryget = "select * from Payment";
            let pool = await Conection_1.Conection.conection();
            let arraypay = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let paym = new DTOPayment_1.default(x.IDPaymentt, x.IDCardPa, x.NumberReservation, x.IDPassangerServicee, x.PassengerAmount, x.TotalRS, x.Datee);
                arraypay.push(paym);
            }
            pool.close();
            return arraypay;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    registerPayment = async (dtopay) => {
        try {
            let queryinsert = "insert into Payment values (@NumberReservation,@IDCardPa,@IDPassangerServicee,@PassengerAmount,@TotalRS,@Datee)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberReservation', mssql_1.Int, dtopay.numberreservation)
                .input('IDCardPa', mssql_1.VarChar, dtopay.idcardpassenger)
                .input('IDPassangerServicee', mssql_1.Int, dtopay.idpassengerservice)
                .input('PassengerAmount', mssql_1.Money, dtopay.passengeramount)
                .input('TotalRS', mssql_1.Money, dtopay.totalrs)
                .input('Datee', mssql_1.Date, dtopay.date)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataPayment;
//# sourceMappingURL=DataPayment.js.map