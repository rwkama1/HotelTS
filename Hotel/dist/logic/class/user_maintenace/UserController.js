"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const instanceBusinessClass_1 = require("../extras/instanceBusinessClass");
const LAutentication_1 = require("./maintenace/LAutentication");
const LGetUsers_1 = require("./maintenace/LGetUsers");
class UserController {
    static instancia;
    constructor() { }
    static getInstance() {
        if (!UserController.instancia) {
            UserController.instancia = new UserController();
        }
        return UserController.instancia;
    }
    //************ CRUD ********************** */
    registerUser = async (dtouser) => {
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
        const result = await logicuser.register();
        return result;
    };
    updateUser = async (dtouser) => {
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
        const result = await logicuser.update();
        return result;
    };
    inactivateUser = async (dtouser) => {
        const logicuser = instanceBusinessClass_1.InstanceLogicClass.instanceLUser(dtouser);
        const result = await logicuser.disable();
        return result;
    };
    getUser = async (idcard) => {
        const guser = await LGetUsers_1.LGetUsers.getLUser(idcard);
        return guser;
    };
    //***************** GETUSERS ***************** */
    getUsers = async () => {
        const gusers = await LGetUsers_1.LGetUsers.getLUsers();
        return gusers;
    };
    getLActiveSortUsers = async () => {
        const getactiveuser = await LGetUsers_1.LGetUsers.getLActiveSortUsers();
        return getactiveuser;
    };
    //******************* AUTENTICATION *********************** */
    loginUser = async (idcard, password) => {
        const luser = await LAutentication_1.LUserAutentication.getInstance().loginUser(idcard, password);
        return luser;
    };
    getloginUser = () => {
        const getloginuser = LAutentication_1.LUserAutentication.getInstance().userlogin;
        return getloginuser;
    };
    logout = () => {
        const logout = LAutentication_1.LUserAutentication.getInstance().logout();
        return logout;
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map