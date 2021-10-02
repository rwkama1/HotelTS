"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DTOPassengerService {
    numberps;
    idcardp;
    startdate;
    enddate;
    total;
    observations;
    listdetailps;
    constructor(pnumberps, pidcardp, pstartdate, penddate, ptotal, pobservations, plistdetailps) {
        this.numberps = pnumberps;
        this.idcardp = pidcardp;
        this.startdate = pstartdate;
        this.enddate = penddate;
        this.total = ptotal;
        this.observations = pobservations;
        this.listdetailps = plistdetailps;
    }
}
exports.default = DTOPassengerService;
//# sourceMappingURL=DTOPassengerService.js.map