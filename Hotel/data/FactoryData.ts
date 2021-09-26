
import DataPassenger from "./class/DataPassenger";
import DataReservation from "./class/DataReservation";
import DataRoom from "./class/DataRoom";
import DataService from "./class/DataService";
import DataUser from "./class/DataUser";
import IDataPassenger from "./interfaces/IDataPassenger";
import IDataReservation from "./interfaces/IDataReservation";
import IDataRoom from "./interfaces/IDataRoom";
import IDataService from "./interfaces/IDataService";
import IDataUsers from "./interfaces/IDataUser";

export class FactoryData {
    public static getDataUser(): IDataUsers {
        return (DataUser.getInstance());
    }
    public static getDataPassenger(): IDataPassenger {
        return (DataPassenger.getInstance());
    }
    public static getDataRoom(): IDataRoom {
        return (DataRoom.getInstance());
    }  
    public static getDataService(): IDataService {
        return (DataService.getInstance());
    }  
    public static getDataReservation(): IDataReservation {
        return (DataReservation.getInstance());
    }    
}