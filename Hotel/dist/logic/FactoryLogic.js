"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryLogic = void 0;
const PassengerController_1 = require("./class/passenger_maintenance/PassengerController");
const ReservationController_1 = require("./class/reservation_maintenance/ReservationController");
const RoomController_1 = require("./class/room_maintenance/RoomController");
const ServiceController_1 = require("./class/service_maintenance/ServiceController");
const UserController_1 = require("./class/user_maintenace/UserController");
class FactoryLogic {
    static UserController() {
        return (UserController_1.UserController.getInstance());
    }
    static PassengerController() {
        return (PassengerController_1.PassengerController.getInstance());
    }
    static RoomController() {
        return (RoomController_1.RoomController.getInstance());
    }
    static ServiceController() {
        return (ServiceController_1.ServiceController.getInstance());
    }
    static ReservationController() {
        return (ReservationController_1.ReservationController.getInstance());
    }
}
exports.FactoryLogic = FactoryLogic;
//# sourceMappingURL=FactoryLogic.js.map