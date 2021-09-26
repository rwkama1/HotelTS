import DTOPassenger from "../../shared/entity/DTOPassenger";

export default interface IDataPassenger 
{
    getPassengers():Promise<DTOPassenger[]>; 
    changeStatePassenger(idcard:string,state:string):Promise<boolean>;
    registerPassenger(dtuser:DTOPassenger):Promise<boolean>;
    updatePassenger(dtuser:DTOPassenger):Promise<boolean>;
}