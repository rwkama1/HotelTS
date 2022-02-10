"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUser = void 0;
class ArrayUser {
    arrayuser;
    constructor(parrayuser) {
        this.arrayuser = parrayuser;
    }
    search = (idcard) => {
        let listuser = this.arrayuser;
        for (let user of listuser) {
            if (idcard === user.idcard) {
                return user;
            }
        }
        return null;
    };
    getActiveSort = () => {
        let listuser = this.arrayuser;
        let newarray = [];
        for (let user of listuser) {
            if (user.statee === "Active") {
                newarray.push(user);
            }
        }
        const sortarray = newarray.sort((a, b) => a.name.localeCompare(b.name));
        return sortarray;
    };
}
exports.ArrayUser = ArrayUser;
//# sourceMappingURL=LArrayUser.js.map