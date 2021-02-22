// =======================================================
//  Requerimientos
// =======================================================
import MySQL from "../../store/mysql";

// =======================================================
// Funciones
// =======================================================

const listar = ( uid: string, callback: Function ) => {

    // =======================================================
    // Query Final
    // =======================================================
    const sql = `SELECT M.titulo, M.icono, M.url
                FROM aaa_ambrosia_menu as M 
                JOIN ab_rol as R on (R.idrol = M.ab_rol_idrol) 
                JOIN ab_perfil as P on (R.idrol = P.rol_idrol) 
                WHERE uid =  + '${ uid }' ORDER BY posicion ASC`;

    MySQL.execMysql( sql, ( errMenu: any, dataMenu: any ) => {

        if ( errMenu ) {
            callback( errMenu );
            return;
        }

        callback( null, dataMenu );
    });

};

module.exports = {
    listar
};
