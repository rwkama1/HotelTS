

import { CustomException } from "./customexception";


export class DataException extends CustomException {

    constructor(mensaje:string) {
        super(mensaje);
    }


}



