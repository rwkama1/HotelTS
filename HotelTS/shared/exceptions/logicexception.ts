import { CustomException } from "./customexception";

 export class LogicException extends CustomException {

    constructor(mensaje:string) {
        super(mensaje);
    }


}
