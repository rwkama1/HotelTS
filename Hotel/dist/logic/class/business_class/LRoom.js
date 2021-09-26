"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTORoom_1 = require("../../../shared/entity/DTORoom");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
const LCUDRoom_1 = require("../room_maintenance/maintenance/LCUDRoom");
const LGetRoom_1 = require("../room_maintenance/maintenance/LGetRoom");
class LogicRoom {
    _numberroom;
    _typeroom;
    _acommodation;
    _description;
    _value;
    _typebed;
    _statee;
    _image;
    //GETTERS
    get numberroom() {
        return this._numberroom;
    }
    get typeroom() {
        return this._typeroom;
    }
    get typebed() {
        return this._typebed;
    }
    get acommodation() {
        return this._acommodation;
    }
    get description() {
        return this._description;
    }
    get value() {
        return this._value;
    }
    get image() {
        return this._image;
    }
    get statee() {
        return this._statee;
    }
    //SETTERS
    set numberroom(value) {
        this._numberroom = value;
    }
    set typeroom(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The typeroom cannot be empty");
        }
        this._typeroom = value;
    }
    set typebed(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The typebed cannot be empty");
        }
        this._typebed = value;
    }
    set acommodation(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The acommodation cannot be empty");
        }
        this._acommodation = value;
    }
    set description(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The description cannot be empty");
        }
        this._description = value;
    }
    set value(value) {
        if (value <= 0) {
            throw new logicexception_1.LogicException("The value must be grater than 0");
        }
        this._value = value;
    }
    set image(value) {
        if (!(value.trim().match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))) {
            throw new logicexception_1.LogicException("Only images files are allowed");
        }
        this._image = value;
    }
    set statee(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The state cannot be empty");
        }
        this._statee = value;
    }
    register = async () => {
        let roomsh = await LGetRoom_1.LGetRoom.getLRoom(this.numberroom);
        if (roomsh != null) {
            if (roomsh.statee === "Active") {
                throw new logicexception_1.LogicException("That Room already exists in the system");
            }
            else {
                const actroom = await LCUDRoom_1.LCUDRoom.changeStateRoom(roomsh.numberroom, "Active");
                return actroom;
            }
        }
        const dto = this.getDTO();
        const regroom = await LCUDRoom_1.LCUDRoom.registerRoom(dto);
        return regroom;
    };
    update = async () => {
        let roomsh = await LGetRoom_1.LGetRoom.getLRoom(this.numberroom);
        if (roomsh === null) {
            throw new logicexception_1.LogicException("That Room do not exists in the system");
        }
        if (roomsh.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Room is inactive");
        }
        const dto = this.getDTO();
        const updateroom = await LCUDRoom_1.LCUDRoom.updateRoom(dto);
        return updateroom;
    };
    disable = async () => {
        let roomsh = await LGetRoom_1.LGetRoom.getLRoom(this.numberroom);
        if (roomsh === null) {
            throw new logicexception_1.LogicException("That Room do not exists in the system");
        }
        if (roomsh.statee === "Inactive") {
            throw new logicexception_1.LogicException("That Room is inactive");
        }
        const dto = this.getDTO();
        const delroom = await LCUDRoom_1.LCUDRoom.changeStateRoom(dto.numberroom, "Inactive");
        return delroom;
    };
    getDTO = () => {
        let dtroom = new DTORoom_1.default(this.numberroom, this.typeroom, this.typebed, this.acommodation, this.description, this.value, this.statee, this.image);
        return dtroom;
    };
    constructor(pnumberroom, ptyperoom, ptypebed, pacommodation, pdescription, pvalue, pstatee, pimage) {
        this.numberroom = pnumberroom;
        this.typeroom = ptyperoom;
        this.typebed = ptypebed;
        this.acommodation = pacommodation;
        this.description = pdescription;
        this.value = pvalue;
        this.image = pimage;
        this.statee = pstatee;
    }
}
exports.default = LogicRoom;
//# sourceMappingURL=LRoom.js.map