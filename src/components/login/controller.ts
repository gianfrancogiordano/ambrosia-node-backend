// =======================================================
//  Requerimentos
// =======================================================

// import { FieldInfo } from "mysql";
// import { Err } from "../../classes/err";

import {Err} from "../../classes/err";

const storelogin = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const getUsuario = ( body: any ) => {

    return new Promise( (resolve, reject) => {


        storelogin.getUserLogin( body.usuario.uid, (err: any, data: any, fields: any) => {


           if ( err ) {
                reject( new Err('Error interno', 500, err) );
                return;
           }

            resolve( data );

        });

    });
}

module.exports = {
    getUsuario
};
