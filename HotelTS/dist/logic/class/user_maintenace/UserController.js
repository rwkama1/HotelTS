"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const FactoryData_1 = require("../../../data/FactoryData");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LAutentication_1 = require("./maintenace/LAutentication");
const LCUDUsers_1 = require("./maintenace/LCUDUsers");
const LGetUsers_1 = require("./maintenace/LGetUsers");
class UserController {
    //#region SINGLETON
    static instancia;
    constructor() { }
    static getInstance() {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }
        return UserController.instancia;
    }
    //#endregion
    //#region CUD
    registerUser = async (dtouser) => {
        return LCUDUsers_1.LCRUDUser.registerUser(dtouser);
    };
    updateUser = async (dtouser) => {
        return LCUDUsers_1.LCRUDUser.updateUser(dtouser);
    };
    inactivateUser = async (dtouser) => {
        return LCUDUsers_1.LCRUDUser.inactivateUser(dtouser);
    };
    //#endregion
    //#region SEARCH
    getUser = async (idcard) => {
        const guser = await LGetUsers_1.LGetUsers.getLUser(idcard);
        if (guser === null) {
            throw new logicexception_1.LogicException("The User does not exists in the system");
        }
        return guser.getDTO();
    };
    getUsersSearch = async (idcard, typeuser, phonenumber, address, mail) => {
        const guser = await FactoryData_1.FactoryData.getDataUser().getUsersSearch(idcard, typeuser, phonenumber, address, mail);
        return guser;
    };
    //#endregion
    //#region LISTS
    getUsers = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().getUsers();
        return guser;
    };
    getUsersActive = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().getUsersActive();
        return guser;
    };
    getUsersInactive = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().getUsersInactive();
        return guser;
    };
    SortbyIdCardDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyIdCardDesc();
        return guser;
    };
    SortbyNameDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyNameDesc();
        return guser;
    };
    SortbyNameAsc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyNameAsc();
        return guser;
    };
    SortbyAddressDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyAddressDesc();
        return guser;
    };
    SortbyAddressAsc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyAddressAsc();
        return guser;
    };
    SortbyPhoneDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyPhoneDesc();
        return guser;
    };
    SortbyPhoneAsc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyPhoneAsc();
        return guser;
    };
    SortbyTypeUserDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyTypeUserDesc();
        return guser;
    };
    SortbyTypeUserAsc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyTypeUserAsc();
        return guser;
    };
    SortbymailDesc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbymailDesc();
        return guser;
    };
    SortbyMailAsc = async () => {
        const guser = await FactoryData_1.FactoryData.getDataUser().SortbyMailAsc();
        return guser;
    };
    //#endregion
    //#region AUTENTICATION
    loginUser = async (idcard, password) => {
        const luser = await LAutentication_1.LUserAutentication.getInstance().loginUser(idcard, password);
        return luser.getDTO();
    };
    getloginUser = () => {
        const getloginuser = LAutentication_1.LUserAutentication.getInstance().userlogin;
        if (getloginuser === null) {
            throw new logicexception_1.LogicException("There is no user logged in");
        }
        return getloginuser.getDTO();
    };
    logout = () => {
        const logout = LAutentication_1.LUserAutentication.getInstance().logout();
        return logout;
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map