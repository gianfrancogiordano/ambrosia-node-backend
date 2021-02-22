// =======================================================
//  Requerimentos
// =======================================================
const routerLogin     = require('express').Router();
const responseLogin   = require('../../routes/response'); // Respuestas unificadas del server
const controllerLogin = require('../login/controller');

// =======================================================
//  Metodos
// =======================================================

routerLogin.get('/', (req: Request, res: Response) => {

    controllerLogin.getUsuario( req.body )
        .then( ( respuesta: any ) => {
            responseLogin.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseLogin.error(req, res, err.msn, err.status, err.err);
        });
});


module.exports = routerLogin;
