// =======================================================
//  Requerimientos
// =======================================================
import MySQL from "../../store/mysql";

// =======================================================
// Funciones
// =======================================================

const getUserLogin = ( uid: string, callback: Function) => {

    const sql = `SELECT PE.nombres, R.descripcion as role, P.avatar FROM
                ab_perfil as P JOIN ab_rol as R on (P.rol_idrol = R.idrol)
                JOIN ab_persona as PE on (PE.idpersona = P.ab_persona_idpersona)
                WHERE P.uid = '${ uid }'`;

    MySQL.execMysql(sql,(error: any, data: any ) => {

        if ( error )
            return callback( error );

        callback( null, data );

    });

};

module.exports = {
    getUserLogin,
};
