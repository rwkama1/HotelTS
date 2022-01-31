"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerController = void 0;
const FactoryData_1 = require("../../../data/FactoryData");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LCUDPassenger_1 = require("./maintenace/LCUDPassenger");
const LGetPassenger_1 = require("./maintenace/LGetPassenger");
const LPassengerAutentication_1 = require("./maintenace/LPassengerAutentication");
class PassengerController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!PassengerController.instancia) {
            PassengerController.instancia = new PassengerController();
        }
        return PassengerController.instancia;
    }
    //#region CUD
    registerPassenger = async (dtpassenger) => {
        return LCUDPassenger_1.LCUDPassenger.registerPassenger(dtpassenger);
    };
    updatePassanger = async (dtpassenger) => {
        return LCUDPassenger_1.LCUDPassenger.updatePassenger(dtpassenger);
    };
    inactivatePassanger = async (dtpassenger) => {
        return LCUDPassenger_1.LCUDPassenger.inactivatePassenger(dtpassenger);
    };
    //#endregion
    //#region SEARCH
    getPassanger = async (idcard) => {
        const guser = await LGetPassenger_1.LGetPassenger.getLPassenger(idcard);
        if (guser === null) {
            throw new logicexception_1.LogicException("The Passenger does not exists in the system");
        }
        return guser.getDTO();
    };
    getPassengerSearch = async (idcard, name, LastName, country, town, phonenumber, address, mail) => {
        return FactoryData_1.FactoryData.getDataPassenger().getPassengerSearch(idcard, name, LastName, country, town, phonenumber, address, mail);
    };
    //#endregion
    //#region LISTS
    getPassengers = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().getPassengers();
    };
    getPassengerActives = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().getPassengerActives();
    };
    getPassengersInactive = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().getUsersInactive();
    };
    SortbyIdCardDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyIdCardDesc();
    };
    SortbyNameDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyNameDesc();
    };
    SortbyNameAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyNameAsc();
    };
    SortbyAddressDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyAddressDesc();
    };
    SortbyAddressAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyAddressAsc();
    };
    SortbyPhoneDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyPhoneDesc();
    };
    SortbyPhoneAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyPhoneAsc();
    };
    SortbyCountryDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyCountryDesc();
    };
    SortbyCountryAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyCountryAsc();
    };
    SortbymailDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbymailDesc();
    };
    SortbyMailAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyMailAsc();
    };
    SortbyTownDesc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyTownDesc();
    };
    SortbyTownAsc = async () => {
        return FactoryData_1.FactoryData.getDataPassenger().SortbyTownAsc();
    };
    //#endregion
    //#region AUTENTICATION
    loginPassenger = async (idcard, password) => {
        const luser = await LPassengerAutentication_1.LPassengerAutentication.getInstance().loginPassenger(idcard, password);
        return luser.getDTO();
    };
    getloginpassenger = () => {
        const getloginpassenger = LPassengerAutentication_1.LPassengerAutentication.getInstance().passengerlogin;
        if (getloginpassenger === null) {
            throw new logicexception_1.LogicException("There is no passenger logged in");
        }
        return getloginpassenger.getDTO();
    };
    logout = () => {
        const logout = LPassengerAutentication_1.LPassengerAutentication.getInstance().logout();
        return logout;
    };
}
exports.PassengerController = PassengerController;
//# sourceMappingURL=PassengerController.js.map