    import { VarChar } from "mssql";
    import DTOUser from "../../shared/entity/DTOUser";
    import { DataException } from "../../shared/exceptions/dataexception";
    import { Conection } from "../Conection";
    import IDataUsers from "../interfaces/IDataUser";

    export default class DataUser implements IDataUsers {
    //#region SINGLETON
    private static instancia: DataUser;
    private constructor() { }
    public static getInstance(): DataUser {
    if (!DataUser.instancia) {
        DataUser.instancia = new DataUser();
    }

    return DataUser.instancia;
    }
    //#endregion
    //#region  CUD

    registerUser=async(dtuser:DTOUser)=>
    {
    try {
        let queryinsert = "insert into Users values (@IDCard,@NamesUser,@LastName,@Addresss,@PhoneNumber,@TypeUser,@Hashh,'Active',@PasswordUser,@Mail)"
        let pool = await Conection.conection();
    //   let sqltools=Conection.sqlserver();
        const result = await pool.request()
            .input('IDCard',VarChar, dtuser.idcard)
            .input('NamesUser', VarChar, dtuser.name)
            .input('LastName', VarChar, dtuser.surname)
            .input('Addresss', VarChar, dtuser.address)
            .input('PhoneNumber', VarChar, dtuser.phone)
            .input('TypeUser', VarChar, dtuser.typeuserr)
            .input('PasswordUser', VarChar, dtuser.password)
            .input('Hashh', VarChar, dtuser.hashh)
            .input('Mail', VarChar, dtuser.maill)
            .query(queryinsert)
        pool.close();
        return true;
        
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }

    }
    updateUser=async(dtuser:DTOUser)=>
    {
    try {
        let queryupdate = "Update Users Set NamesUser=@NamesUser,LastName=@LastName,Addresss=@Addresss,PhoneNumber=@PhoneNumber,TypeUser=@TypeUser,PasswordUser=@PasswordUser,Hashh=@Hashh,Mail=@Mail where IDCard=@IDCard";
        let pool = await Conection.conection();

        const result = await pool.request()
            .input('IDCard', VarChar, dtuser.idcard)
            .input('NamesUser', VarChar, dtuser.name)
            .input('LastName', VarChar, dtuser.surname)
            .input('Addresss', VarChar, dtuser.address)
            .input('PhoneNumber', VarChar, dtuser.phone)
            .input('TypeUser', VarChar, dtuser.typeuserr)
            .input('PasswordUser', VarChar, dtuser.password)
            .input('Hashh', VarChar, dtuser.hashh)
            .input('Mail', VarChar, dtuser.maill)
            .query(queryupdate)
            
        
        pool.close();
        return true;
        
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }

    }
    changeStateUser=async(idcard:string,state:string)=>
    {
    try {
        let queryupdate = "Update Users Set Statee=@Statee where IDCard=@IDCard";
        let pool = await Conection.conection();
        
        const result = await pool.request()
            .input('IDCard', VarChar,idcard)
            .input('Statee', VarChar, state)
            .query(queryupdate)
            
        pool.close();
        return true;
        
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }

    }
    //#endregion
    //#region LISTS
    getUsers=async()=>
    {
    try {
        let queryget = "select * from Users"
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }

    getUsersActive=async()=>
    {
    try {
        let queryget = "select * from Users where Statee='Active'";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    getUsersInactive=async()=>
    {
    try {
        let queryget = "select * from Users where Statee='Inactive'";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
            }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyIdCardDesc=async()=>
    {
    try {
        let queryget = "select * from Users where Statee='Active' order by IDCard desc";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
            }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyNameDesc=async()=>
    {
    try {
        let queryget = "select * from Users where Statee='Active' order by NamesUser desc";
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)
        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyNameAsc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by NamesUser asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
            x.NamesUser,x.LastName,
            x.Addresss,x.PhoneNumber,
            x.TypeUser,x.PasswordUser,
            x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
        }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyAddressDesc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by Addresss desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
            x.NamesUser,x.LastName,
            x.Addresss,x.PhoneNumber,
            x.TypeUser,x.PasswordUser,
            x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyAddressAsc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by Addresss asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
    let user = new DTOUser(x.IDCard,
        x.NamesUser,x.LastName,
        x.Addresss,x.PhoneNumber,
        x.TypeUser,x.PasswordUser,
        x.Hashh,x.Mail,x.Statee);
    arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyPhoneDesc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by PhoneNumber desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
            x.NamesUser,x.LastName,
            x.Addresss,x.PhoneNumber,
            x.TypeUser,x.PasswordUser,
            x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyPhoneAsc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by PhoneNumber asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
    let user = new DTOUser(x.IDCard,
        x.NamesUser,x.LastName,
        x.Addresss,x.PhoneNumber,
        x.TypeUser,x.PasswordUser,
        x.Hashh,x.Mail,x.Statee);
    arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }   
    SortbyTypeUserDesc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by typeuser desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
            x.NamesUser,x.LastName,
            x.Addresss,x.PhoneNumber,
            x.TypeUser,x.PasswordUser,
            x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbyTypeUserAsc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by typeuser asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
    let user = new DTOUser(x.IDCard,
        x.NamesUser,x.LastName,
        x.Addresss,x.PhoneNumber,
        x.TypeUser,x.PasswordUser,
        x.Hashh,x.Mail,x.Statee);
    arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    SortbymailDesc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by mail desc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
            x.NamesUser,x.LastName,
            x.Addresss,x.PhoneNumber,
            x.TypeUser,x.PasswordUser,
            x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }  
    SortbyMailAsc=async()=>
    {
    try {
    let queryget = "select * from Users where Statee='Active' order by mail asc";
    let pool = await Conection.conection();
    let arrayu=[];
    const result = await pool.request()
    .query(queryget)
    for (let x of result.recordset) {
        let user = new DTOUser(x.IDCard,
        x.NamesUser,x.LastName,
        x.Addresss,x.PhoneNumber,
        x.TypeUser,x.PasswordUser,
        x.Hashh,x.Mail,x.Statee);
        arrayu.push(user);
    }
    pool.close();
    return arrayu;
    }
    catch(e)
    {
    throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    //#endregion
    //#region SEARCH
    getUserbyID=async(idcard:string)=>
    {
    let pool = await Conection.conection();
    var dtouser=null;
    try {
        let queryget = `select * from Users where idcard=@IDCard`;
        
        
        const result = await pool.request()
        .input('IDCard',VarChar, idcard)
        .query(queryget)
        
        dtouser = new DTOUser(result.recordset[0].IDCard,result.recordset[0].NamesUser,
            result.recordset[0].LastName,result.recordset[0].Addresss,result.recordset[0].PhoneNumber
            ,result.recordset[0].TypeUser,result.recordset[0].PasswordUser,result.recordset[0].Hashh
            ,result.recordset[0].Mail,result.recordset[0].Statee); 

        return dtouser
        
    }
    catch(e)
    {
        return dtouser
    }
    finally
    {
    pool.close();
    }
    }
    getUsersSearch=async(idcard,typeuser,phonenumber,address,mail)=>
    {
    try {
        let queryget=`SELECT *
        FROM   users
        WHERE  idcard LIKE '%${idcard}%'
               AND typeuser LIKE '%${typeuser}%'
               AND phonenumber LIKE '%${phonenumber}%'
               AND addresss LIKE '%${address}%'
               AND mail LIKE '%${mail}%'
               AND statee='Active'`;
        
        let pool = await Conection.conection();
        let arrayu=[];
        const result = await pool.request()
        .query(queryget)


        for (let x of result.recordset) {
            let user = new DTOUser(x.IDCard,
                x.NamesUser,x.LastName,
                x.Addresss,x.PhoneNumber,
                x.TypeUser,x.PasswordUser,
                x.Hashh,x.Mail,x.Statee);
            arrayu.push(user);
        }
        pool.close();
        return arrayu;
    }
    catch(e)
    {
        throw new DataException("An error occurred related to the user database:   "+e.message)
    }
    }
    //#endregion
    }