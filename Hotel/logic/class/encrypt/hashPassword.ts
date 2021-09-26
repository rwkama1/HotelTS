import { pbkdf2Sync, randomBytes } from "crypto";
export default class HashPassword
{
    static  hashPassword(password:string)  {

        let salt = randomBytes(16).toString('hex');
        let hash  = pbkdf2Sync(password, salt,  
            1000, 64, `sha512`).toString(`hex`); 
        return {hash,salt}
      }
    static verifyPassword(password:string,hashPassword:string,salt:string)  {
      
        var hash = pbkdf2Sync(password,salt, 1000, 64, `sha512`).toString(`hex`); 
        return hashPassword === hash; 
       }
}