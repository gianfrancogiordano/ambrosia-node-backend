// =======================================================
//  Requerimientos
// =======================================================
import { NextFunction } from "express";
const admin = require('../classes/firebase');
const response = require('../routes/response');

// =======================================================
//  Verificacion de Token de usuario
// =======================================================
exports.verificarToken = (req: any, res: any, next: NextFunction) => {

    const token = req.query.token;

    if( !token ) {
        response.error(req, res, 'Token Incorrecto', 401, 'Sin token');
        return;
    }

    admin.auth().verifyIdToken( token )
        .then( ( decodedToken: any ) => {

            req.body.usuario = decodedToken;
            next();

        }).catch( ( err: any ) => {
        return response.error(req, res, 'Token Incorrecto', 401, err);
    });

};
