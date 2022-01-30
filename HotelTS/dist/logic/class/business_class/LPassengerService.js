"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODPassengerService_1 = require("../../../shared/entity/DTODPassengerService");
const DTOPassengerService_1 = require("../../../shared/entity/DTOPassengerService");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LGetPassenger_1 = require("../passenger_maintenance/maintenace/LGetPassenger");
const LGetPassengerServices_1 = require("../passenger_service_maintenance/maintenance/LGetPassengerServices");
const LGetService_1 = require("../service_maintenance/maintenance/LGetService");
const LDPassengerService_1 = require("./LDPassengerService");
class LogicPassengerService {
    _numberps;
    _passenger;
    _startdate;
    _enddate;
    _total;
    _observations;
    _listdetailps;
    //GETTERS
    get numberps() {
        return this._numberps;
    }
    get passenger() {
        return this._passenger;
    }
    get startdate() {
        return this._startdate;
    }
    get total() {
        return this._total;
    }
    get enddate() {
        return this._enddate;
    }
    get observations() {
        return this._observations;
    }
    get listdetailps() {
        return this._listdetailps;
    }
    //SETTERS
    set numberps(value) {
        this._numberps = value;
    }
    set passenger(value) {
        this._passenger = value;
    }
    set startdate(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The Start Date is null");
        }
        this._startdate = value;
    }
    set enddate(value) {
        if (value === null) {
            throw new logicexception_1.LogicException("The End Date is null");
        }
        this._enddate = value;
    }
    set total(value) {
        this._total = value;
    }
    set observations(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The Observation cannot be empty");
        }
        this._observations = value;
    }
    set listdetailps(value) {
        this._listdetailps = value;
    }
    validateDate = () => {
        if (this.startdate >= this.enddate) {
            throw new logicexception_1.LogicException("The End Date must be greater than Start Date");
        }
    };
    registerDetailPS = async (ids) => {
        let lservice = await LGetService_1.LGetService.getLService(ids);
        if (lservice === null) {
            throw new logicexception_1.LogicException("The Service does not exists in the system");
        }
        let lengharraydr = this.listdetailps.length;
        lengharraydr++;
        let detailr = new LDPassengerService_1.default(lengharraydr, lservice, lservice.value);
        let listdps = this.listdetailps;
        listdps.push(detailr);
        return detailr.getDTO();
    };
    removeDetailPS = async (ids) => {
        let lservice = await LGetService_1.LGetService.getLService(ids);
        if (lservice === null) {
            throw new logicexception_1.LogicException("The Service does not exists in the system");
        }
        var listdetailr = this.listdetailps;
        for (var i = 0; i < listdetailr.length; i++) {
            if (listdetailr[i].service.idservice === lservice.idservice) {
                listdetailr.splice(i, 1);
                break;
            }
        }
    };
    close = async (dtops) => {
        let getsps = await LGetPassengerServices_1.default.getListPS();
        let getpassenger = await LGetPassenger_1.LGetPassenger.getLPassenger(dtops.idcardp);
        if (getpassenger === null) {
            throw new logicexception_1.LogicException("The Passenger does not exists in the system");
        }
        this.observations = dtops.observations;
        this.startdate = dtops.startdate;
        this.enddate = dtops.enddate;
        this.passenger = getpassenger;
        this.validateDate();
        let listdetailr = this.listdetailps;
        let vtotal = 0;
        for (let d of listdetailr) {
            vtotal += d.amount;
        }
        this.total = vtotal * this.calculatenumberdays();
        let lengthservices = getsps.arrayps.length;
        this.numberps = lengthservices + 1;
        let data = this.getDTO();
        return data;
    };
    save = () => {
        let havereservrdetails = this.haveDPS();
        if (havereservrdetails) {
            let dtops = this.getDTO();
            return dtops;
        }
        else {
            throw new logicexception_1.LogicException("The Detail Passenger Service has no items");
        }
    };
    addDPS = async (dtops) => {
        let lengthdetailr = dtops.listdetailps.length;
        let lastelementlist = dtops.listdetailps[lengthdetailr - 1];
        let idservice = lastelementlist.idservice;
        let lservice = await LGetService_1.LGetService.getLService(idservice);
        if (lservice === null) {
            throw new logicexception_1.LogicException("The Service does not exists in the system");
        }
        let detailr = await this.searchDPSByService(idservice);
        if (detailr != null) {
            throw new logicexception_1.LogicException("The Service already exists in the reservation");
        }
        let ldetailr = new LDPassengerService_1.default(this.listdetailps.length + 1, lservice, lservice.value);
        this.listdetailps.push(ldetailr);
        this.calculateTotal();
        let getdto = this.getDTO();
        return getdto;
    };
    getDTO = () => {
        let arraydtodps = [];
        for (let logicdps of this.listdetailps) {
            let dtodps = new DTODPassengerService_1.default(logicdps.numberdetailps, logicdps.service.idservice, logicdps.amount);
            arraydtodps.push(dtodps);
        }
        let dtops = new DTOPassengerService_1.default(this.numberps, this.passenger.idcard, this.startdate, this.enddate, this.total, this.observations, arraydtodps);
        return dtops;
    };
    haveDPS() {
        var listdetailss = this.listdetailps;
        var haveDPS = listdetailss.length > 0;
        return haveDPS;
    }
    searchDPSByService = async (idservice) => {
        let listdetailr = this.listdetailps;
        for (let detailr of listdetailr) {
            if (idservice === detailr.service.idservice) {
                return detailr;
            }
        }
        return null;
    };
    calculatenumberdays = () => {
        var day_as_milliseconds = 86400000;
        let diff_in_millisenconds = this.enddate.valueOf() - this.startdate.valueOf();
        var diff_in_days = diff_in_millisenconds / day_as_milliseconds;
        return diff_in_days;
    };
    calculateTotal = () => {
        let vtotal = 0;
        for (let d of this.listdetailps) {
            vtotal += d.amount;
        }
        this.total = vtotal * this.calculatenumberdays();
    };
    constructor(pnumberps, ppassenger, pstartdate, penddate, ptotal, pobservations, plistdetailps) {
        this.numberps = pnumberps;
        this.passenger = ppassenger;
        this.startdate = pstartdate;
        this.enddate = penddate;
        this.total = ptotal;
        this.observations = pobservations;
        this.listdetailps = plistdetailps;
    }
}
exports.default = LogicPassengerService;
//# sourceMappingURL=LPassengerService.js.map