"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGetUsers = void 0;
const FactoryData_1 = require("../../../../data/FactoryData");
const LArrayUser_1 = require("../../business_class/array/LArrayUser");
const instanceBusinessClass_1 = require("../../extras/instanceBusinessClass");
class LGetUsers {
    static getLActiveSortUsers = async () => {
        let datausers = await this.getLUsers();
        let searchu = datausers.getActiveSort();
        return searchu;
    };
    static getLUser = async (idcard) => {
        let datausers = await this.getLUsers();
        let searchuser = datausers.search(idcard);
        return searchuser;
    };
    static getLUsers = async () => {
        let arrayluser = [];
        let datausers = await FactoryData_1.FactoryData.getDataUser().getUsers();
        for (var dtouser of datausers) {
            const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
            arrayluser.push(logicuser);
        }
        let arraylogicusers = new LArrayUser_1.ArrayUser(arrayluser);
        return arraylogicusers;
    };
}
exports.LGetUsers = LGetUsers;
//# sourceMappingURL=LGetUsers.js.map