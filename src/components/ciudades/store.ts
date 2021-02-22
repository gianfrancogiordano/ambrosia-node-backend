// =======================================================
//  Requerimientos
// =======================================================
import MySQL from "../../store/mysql";

// =======================================================
// Funciones
// =======================================================

const listar = ( callback: Function ) => {

    // =======================================================
    // Query Final
    // =======================================================
    const sql = 'SELECT idmunicipio as id, municipio as ciudad FROM `pd_ciudad`';

    MySQL.execMysql( sql, ( errCiudades: any, dataCiudades: any ) => {

        if ( errCiudades ) {
            callback( errCiudades );
            return;
        }

        callback( null, dataCiudades );
    });

};

module.exports = {
    listar
};
