// =======================================================
//  Requerimentos
// =======================================================

import { Err } from "../../classes/err";
const storeDash = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const infomeDashboard = () => {

    return new Promise( (resolve, reject) => {

        storeDash.getInformeDashboard( (error: any, data: any) => {

            if ( error ) {
                reject( new Err( error.errno, 500, error ) );
                return;
            }

            resolve( data );
        });

    });
}

module.exports = {
    informe: infomeDashboard
};
