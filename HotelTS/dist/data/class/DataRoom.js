"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = require("mssql");
const DTORoom_1 = require("../../shared/entity/DTORoom");
const dataexception_1 = require("../../shared/exceptions/dataexception");
const Conection_1 = require("../Conection");
class DataRoom {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!DataRoom.instancia) {
            DataRoom.instancia = new DataRoom();
        }
        return DataRoom.instancia;
    }
    registerRoom = async (dtoroom) => {
        try {
            let queryinsert = "insert into Room values (@Typee,@Typebed,@Accommodation,@Descriptionn,@Value,'Active',@Imagee)";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('Typee', mssql_1.VarChar, dtoroom.typeroom)
                .input('Typebed', mssql_1.VarChar, dtoroom.typebed)
                .input('Accommodation', mssql_1.VarChar, dtoroom.acommodation)
                .input('Descriptionn', mssql_1.VarChar, dtoroom.description)
                .input('Value', mssql_1.Money, dtoroom.value)
                .input('Imagee', mssql_1.VarChar, dtoroom.image)
                .query(queryinsert);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    updateRoom = async (dtoroom) => {
        try {
            let queryupdate = "Update Room Set Typee=@Typee,Typebed=@Typebed,Accommodation=@Accommodation,Descriptionn=@Descriptionn,Value=@Value,Imagee=@Imagee where NumberRoomm=@NumberRoomm";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberRoomm', mssql_1.Int, dtoroom.numberroom)
                .input('Typee', mssql_1.VarChar, dtoroom.typeroom)
                .input('Typebed', mssql_1.VarChar, dtoroom.typebed)
                .input('Accommodation', mssql_1.VarChar, dtoroom.acommodation)
                .input('Descriptionn', mssql_1.VarChar, dtoroom.description)
                .input('Value', mssql_1.Money, dtoroom.value)
                .input('Imagee', mssql_1.VarChar, dtoroom.image)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    changeStateRoom = async (numberroom, state) => {
        try {
            let queryupdate = "Update Room Set Statee=@Statee where NumberRoomm=@NumberRoomm";
            let pool = await Conection_1.Conection.conection();
            const result = await pool.request()
                .input('NumberRoomm', mssql_1.Int, numberroom)
                .input('Statee', mssql_1.VarChar, state)
                .query(queryupdate);
            pool.close();
            return true;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
    getRooms = async () => {
        try {
            let queryget = "select * from Room";
            let pool = await Conection_1.Conection.conection();
            let arrayrooms = [];
            const result = await pool.request()
                .query(queryget);
            for (let x of result.recordset) {
                let room = new DTORoom_1.default(x.NumberRoomm, x.Typee, x.Typebed, x.Accommodation, x.Descriptionn, x.Value, x.Statee, x.Imagee);
                arrayrooms.push(room);
            }
            pool.close();
            return arrayrooms;
        }
        catch (e) {
            throw new dataexception_1.DataException("DataLayer Error: " + e.message);
        }
    };
}
exports.default = DataRoom;
//# sourceMappingURL=DataRoom.js.map