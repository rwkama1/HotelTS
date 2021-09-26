import DTOService from "../../shared/entity/DTOService";

export default interface IDataService 
{
    registerService(dtoservice:DTOService):Promise<boolean>;
    updateService(dtoservice:DTOService):Promise<boolean>;
    getServices():Promise<DTOService[]>;
    changeStateService(idservice:number,state:string):Promise<boolean>;
}