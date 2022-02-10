"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryData = void 0;
const DataPassenger_1 = require("./class/DataPassenger");
const DataPassengerService_1 = require("./class/DataPassengerService");
const DataPayment_1 = require("./class/DataPayment");
const DataReservation_1 = require("./class/DataReservation");
const DataRoom_1 = require("./class/DataRoom");
const DataService_1 = require("./class/DataService");
const DataUser_1 = require("./class/DataUser");
class FactoryData {
    static getDataUser() {
        return (DataUser_1.default.getInstance());
    }
    static getDataPassenger() {
        return (DataPassenger_1.default.getInstance());
    }
    static getDataRoom() {
        return (DataRoom_1.default.getInstance());
    }
    static getDataService() {
        return (DataService_1.default.getInstance());
    }
    static getDataReservation() {
        return (DataReservation_1.default.getInstance());
    }
    static getDataPassengerService() {
        return (DataPassengerService_1.default.getInstance());
    }
    static getDataPayment() {
        return (DataPayment_1.default.getInstance());
    }
}
exports.FactoryData = FactoryData;
//# sourceMappingURL=FactoryData.js.map