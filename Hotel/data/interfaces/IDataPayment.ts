import DTOPayment from "../../shared/entity/DTOPayment";

export default interface IDataPayment 
{
    registerPayment(dtopay:DTOPayment):Promise<boolean>; 
    getPayments():Promise<DTOPayment[]>;
    // addDPS(dtopservice:DTOPassengerService):Promise<boolean>;
}