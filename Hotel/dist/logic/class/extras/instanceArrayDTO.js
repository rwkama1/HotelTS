"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceArrayDTO = void 0;
class InstanceArrayDTO {
    static instanceArrayUser = (larrayuser) => {
        let arraydto = [];
        for (let user of larrayuser) {
            let dtouser = user.getDTO();
            arraydto.push(dtouser);
        }
        return arraydto;
    };
    static instanceArrayPassenger = (larraypassenger) => {
        let arraydto = [];
        for (let passenger of larraypassenger) {
            let dtopass = passenger.getDTO();
            arraydto.push(dtopass);
        }
        return arraydto;
    };
    static instanceArrayRoom = (larrayroom) => {
        let arraydto = [];
        for (let room of larrayroom) {
            let dtoroom = room.getDTO();
            arraydto.push(dtoroom);
        }
        return arraydto;
    };
    static instanceArrayService = (larrayservice) => {
        let arraydto = [];
        for (let service of larrayservice) {
            let dtos = service.getDTO();
            arraydto.push(dtos);
        }
        return arraydto;
    };
    static instanceArrayReservation = (larrayr) => {
        let arraydto = [];
        for (let res of larrayr) {
            let dtor = res.getDTO();
            arraydto.push(dtor);
        }
        return arraydto;
    };
}
exports.InstanceArrayDTO = InstanceArrayDTO;
//# sourceMappingURL=instanceArrayDTO.js.map