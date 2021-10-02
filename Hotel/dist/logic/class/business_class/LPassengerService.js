"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTODPassengerService_1 = require("../../../shared/entity/DTODPassengerService");
const DTOPassengerService_1 = require("../../../shared/entity/DTOPassengerService");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
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
    registerDetailPS = async (ids) => {
        let lservice = await LGetService_1.LGetService.getLService(ids);
        let lengharraydr = this.listdetailps.length;
        lengharraydr++;
        let detailr = new LDPassengerService_1.default(lengharraydr, lservice, lservice.value);
        let listdps = this.listdetailps;
        listdps.push(detailr);
        return detailr;
    };
    removeDetailPS = async (ids) => {
        let lservice = await LGetService_1.LGetService.getLService(ids);
        var listdetailr = this.listdetailps;
        for (var i = 0; i < listdetailr.length; i++) {
            if (listdetailr[i].service.idservice === lservice.idservice) {
                listdetailr.splice(i, 1);
                break;
            }
        }
    };
    close = async () => {
        let getsps = await LGetPassengerServices_1.default.getListPS();
        let listdetailr = this.listdetailps;
        let vtotal = 0;
        for (let d of listdetailr) {
            vtotal += d.amount;
        }
        this.total = vtotal;
        let lengthservices = getsps.arrayps.length;
        this.numberps = lengthservices;
        let data = this.getDTO();
        return data;
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