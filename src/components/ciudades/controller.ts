// =======================================================
//  Requerimentos
// =======================================================

import { Err } from "../../classes/err";
const storeCiudades = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const listarCiudades = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        storeCiudades.listar( (errListar: any, dataCiudades: any ) => {

            if ( errListar ) {
                reject( new Err('Error Interno', 500, errListar ) );
            }

            resolve( dataCiudades );
        });

    });

}

module.exports = {
    listar: listarCiudades
};
