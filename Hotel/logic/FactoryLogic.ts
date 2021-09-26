
import { PassengerController } from "./class/passenger_maintenance/PassengerController";
import { ReservationController } from "./class/reservation_maintenance/ReservationController";
import { RoomController } from "./class/room_maintenance/RoomController";
import { ServiceController } from "./class/service_maintenance/ServiceController";
import { UserController } from "./class/user_maintenace/UserController";
import IPassengerController from "./interfaces/IPassengerController";
import IReservationController from "./interfaces/IReservationController";
import IRoomController from "./interfaces/IRoomController";
import IServiceController from "./interfaces/IServiceController";
import IUserController from "./interfaces/IUserController";

export class FactoryLogic {
    public static UserController(): IUserController {
        return (UserController.getInstance());
    }
    public static PassengerController(): IPassengerController {
        return (PassengerController.getInstance());
    }
    public static RoomController(): IRoomController {
        return (RoomController.getInstance());
    }
    public static ServiceController(): IServiceController {
        return (ServiceController.getInstance());
    }
    public static ReservationController(): IReservationController {
        return (ReservationController.getInstance());
    }
}