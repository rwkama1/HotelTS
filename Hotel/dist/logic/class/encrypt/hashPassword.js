"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class HashPassword {
    static hashPassword(password) {
        let salt = (0, crypto_1.randomBytes)(16).toString('hex');
        let hash = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return { hash, salt };
    }
    static verifyPassword(password, hashPassword, salt) {
        var hash = (0, crypto_1.pbkdf2Sync)(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return hashPassword === hash;
    }
}
exports.default = HashPassword;
//# sourceMappingURL=hashPassword.js.map