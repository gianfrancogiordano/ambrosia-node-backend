// =======================================================
//  Requerimientos
// =======================================================
import MySQL from "../../store/mysql";

// =======================================================
// Funciones
// =======================================================

const hacerPedido = ( pedido: any, callback: Function ) => {

    // =======================================================
    // Query Final
    // =======================================================
    const sql = ``;

    MySQL.execMysql( sql, ( errPedido: any, dataPedido: any ) => {

        if ( errPedido ) {
            callback( errPedido );
            return;
        }

        callback( null, dataPedido );
    });

};

module.exports = {
    hacerPedido
};
