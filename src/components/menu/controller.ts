
// =======================================================
//  Requerimentos
// =======================================================

import { Err } from "../../classes/err";
const storeMenu = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const listarMenu = ( body: any ) => {

    return new Promise( ( resolve, reject ) => {

        storeMenu.listar( body.usuario.uid, (errListar: any, dataMenu: any ) => {

            if ( errListar ) {
                reject( new Err('Error Interno', 500, errListar ) );
            }

            resolve( dataMenu );
        });

    });

}

module.exports = {
    listar: listarMenu
};
