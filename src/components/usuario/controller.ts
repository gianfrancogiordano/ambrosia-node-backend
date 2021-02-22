// =======================================================
//  Requerimentos
// =======================================================
import { Usuario } from "../../classes/usuario";
import { FieldInfo } from "mysql";
import { Err } from "../../classes/err";

const store = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const guargarUsuario = ( body: any ) => {

    return new Promise( (resolve, reject) => {

        if ( !body.nombre ) {
            reject(new Err('Nombre es requerido', 400, 'Error de campo requerido - Nombre'));
            return;
        }

        if ( !body.documento ) {
            reject(new Err('Documento es requerido', 400, 'Error de campo requerido - Documento'));
            return;
        }

        if( !body.email ) {
            reject(new Err('Email es requerido', 400, 'Error de campo requerido - Email'));
            return;
        }

        if( !body.usuario ) {
            reject(new Err('Usuario es requerido', 400, 'Error de campo requerido - Usuario'));
            return;
        }

        if( !body.password ) {
            reject(new Err('Password es requerido', 400, 'Error de campo requerido - Password'));
            return;
        }

        const nuevoUsuario = new Usuario(
            body.nombre,
            body.documento,
            body.email,
            body.usuario,
            body.password,
            body.role
        );

        store.newUser( nuevoUsuario, (err: any, data: Object[], fields: FieldInfo[]) => {

            if ( err )
                reject( new Err( err.sqlMessage, 500, err ))

            resolve( data );
        });

    });

}

module.exports = {
    post: guargarUsuario
};
