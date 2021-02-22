
// =======================================================
//  Requerimentos
// =======================================================

import { Err } from "../../classes/err";
const storePedido = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const hacerPedido = ( body: any ) => {

    return new Promise( ( resolve, reject ) => {

        storePedido.hacerPedido( body, (errListar: any, dataPedido: any ) => {

            if ( errListar ) {
                reject( new Err('Error Interno', 500, errListar ) );
            }

            resolve( dataPedido );
        });

    });

}

module.exports = {
    pedido: hacerPedido
};
