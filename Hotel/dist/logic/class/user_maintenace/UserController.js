"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const instanceArrayDTO_1 = require("../extras/instanceArrayDTO");
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
        if (guser === null) {
            throw new logicexception_1.LogicException("The User does not exists in the system");
        }
        return guser.getDTO();
    };
    //***************** GETUSERS ***************** */
    getUsers = async () => {
        const gusers = await LGetUsers_1.LGetUsers.getLUsers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayUser(gusers.arrayuser);
        return arraydto;
    };
    getLActiveSortUsers = async () => {
        const getactiveuser = await LGetUsers_1.LGetUsers.getLActiveSortUsers();
        let arraydto = instanceArrayDTO_1.InstanceArrayDTO.instanceArrayUser(getactiveuser);
        return arraydto;
    };
    //******************* AUTENTICATION *********************** */
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