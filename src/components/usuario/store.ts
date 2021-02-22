// =======================================================
//  Requerimientos
// =======================================================
import MySQL from "../../store/mysql";
import { Usuario } from "../../classes/usuario";

// =======================================================
// Funciones
// =======================================================

const nuevoUsuario = ( usuario: Usuario, callback: Function) => {

    const sql = `INSERT INTO persona SET ?`;
    const values = {
        idpersona: null,
        nombres: usuario.nombre,
        documento: usuario.documento,
        email: usuario.email,
        rol_idrol: usuario.role
    }

    MySQL.instance.cnn.beginTransaction( ( errInit) => {

        if ( errInit ) {
            callback( errInit );
            return;
        }

        MySQL.insertMysql(sql, values,( errInsert: any, data1: any) => {

            if ( errInsert ) {
                MySQL.instance.cnn.rollback(callback( errInsert ));
                return;
            }

            const sql2 = 'INSERT INTO perfil SET ?';
            const values2 = {
                usuario: usuario.usuario,
                password: usuario.password,
                persona_idpersona: data1.insertId
            };

            MySQL.insertMysql(sql2, values2, (errInsert2 : any, data2: Object[]) => {

                if ( errInsert2 ) {
                    MySQL.instance.cnn.rollback(callback( errInsert2 ));
                    return;
                }

                MySQL.instance.cnn.commit(( errCommit ) => {

                    if ( errCommit ) {
                        MySQL.instance.cnn.rollback(callback( errCommit ));
                        return;
                    }

                    callback( null, data2 );
                });

            });

        });

    });

};

module.exports = {
    newUser: nuevoUsuario,
};
