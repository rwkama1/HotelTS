"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTOReservation_1 = require("../../shared/entity/DTOReservation");
const DTOReservationDetail_1 = require("../../shared/entity/DTOReservationDetail");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataReservation {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataReservation.instancia) {
            DataReservation.instancia = new DataReservation();
        }
        return DataReservation.instancia;
    }
    registerReservation = async (dtreservation) => {
        try {
            let queryinsert = "insert into Reservation values (@NumberReservationn,@ReservationDate,@ArrivalDate,@DepartureDate,@ProcessStatus,@ConfirmationStatus,@Origin,@Total,@IDCardPassengerr)";
            let queryinsert2 = "insert into ReservationDetail values (@NumberRD,@Value,@NumberReservation,@NumberRoom)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberReservationn', mssql_1.Int, dtreservation.numberreservation)
                .input('ReservationDate', mssql_1.Date, dtreservation.reservationdate)
                .input('ArrivalDate', mssql_1.Date, dtreservation.arrivaldate)
                .input('DepartureDate', mssql_1.Date, dtreservation.departuredate)
                .input('ProcessStatus', mssql_1.VarChar, dtreservation.processtatus)
                .input('ConfirmationStatus', mssql_1.VarChar, dtreservation.confirmationstatus)
                .input('Origin', mssql_1.VarChar, dtreservation.origin)
                .input('Total', mssql_1.Money, dtreservation.total)
                .input('IDCardPassengerr', mssql_1.VarChar, dtreservation.idcardpassenger)
                .query(queryinsert);
            for (let detailr of dtreservation.listDetailReservation) {
                const result2 = await pool.request()
                    .input('NumberRD', mssql_1.Int, detailr.numberrd)
                    .input('Value', mssql_1.Money, detailr.value)
                    .input('NumberReservation', mssql_1.Int, dtreservation.numberreservation)
                    .input('NumberRoom', mssql_1.Int, detailr.numberroom)
                    .query(queryinsert2);
            }
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getReservations = async () => {
        try {
            let queryget = "select * from Reservation";
            let pool = await Conection_1.Conection.conection();
            let arrayreservation = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let reservation = new DTOReservation_1.default(x.NumberReservationn, x.ReservationDate, x.ArrivalDate, x.DepartureDate, x.ProcessStatus, x.ConfirmationStatus, x.Origin, x.Total, x.IDCardPassengerr, await this.getDetailReservations(x.NumberReservationn));
                arrayreservation.push(reservation);
            }
            pool.close();
            return arrayreservation;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getDetailReservations = async (numberreservation) => {
        try {
            let queryget = "select * from ReservationDetail where NumberReservation=@NumberReservationn";
            let pool = await Conection_1.Conection.conection();
            let arraydetailreservation = [];
            const result = await pool.request()
                .input('NumberReservationn', mssql_1.Int, numberreservation)
                .query(queryget);
            for (let x of result.recordset) {
                let detailreservation = new DTOReservationDetail_1.default(x.NumberRD, x.Value, x.NumberRoom);
                arraydetailreservation.push(detailreservation);
            }
            pool.close();
            return arraydetailreservation;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    changeStateReservation = async (dtoreservation) => {
        try {
            let queryupdate = "Update Reservation Set ProcessStatus=@ProcessStatus,ConfirmationStatus=@ConfirmationStatus where NumberReservationn=@NumberReservationn";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberReservationn', mssql_1.Int, dtoreservation.numberreservation)
                .input('ProcessStatus', mssql_1.VarChar, dtoreservation.processtatus)
                .input('ConfirmationStatus', mssql_1.VarChar, dtoreservation.confirmationstatus)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    removeDetailReservation = async (numberr, numberroom) => {
        try {
            let queryd = "Delete from ReservationDetail where NumberReservation=@NumberReservation and NumberRoom=@NumberRoom";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberRoom', mssql_1.Int, numberroom)
                .input('NumberReservation', mssql_1.Int, numberr)
                .query(queryd);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    addDetailReservation = async (dtoreservation) => {
        let listdtrlength = dtoreservation.listDetailReservation.length;
        let queryinsert2 = "insert into ReservationDetail values (@NumberRD,@Value,@NumberReservation,@NumberRoom)";
        try {
            let pool = await Conection_1.Conection.conection();
            const result2 = await pool.request()
                .input('NumberRD', mssql_1.Int, dtoreservation.listDetailReservation[listdtrlength - 1].numberrd)
                .input('Value', mssql_1.Money, dtoreservation.listDetailReservation[listdtrlength - 1].value)
                .input('NumberReservation', mssql_1.Int, dtoreservation.numberreservation)
                .input('NumberRoom', mssql_1.Int, dtoreservation.listDetailReservation[listdtrlength - 1].numberroom)
                .query(queryinsert2);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataReservation;
//# sourceMappingURL=DataReservation.js.map