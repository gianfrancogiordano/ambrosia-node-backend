// =======================================================
//  Requerimentos
// ======================================================
const routerUsuario     = require("express").Router();
const responseUsuario   = require("../../routes/response"); // Respuestas unificadas del server
const controllerUsuario = require("./controller"); // Controlador del componente
const jwtUsuario        = require("../../middlewares/authentication");

// =======================================================
//  Metodos
// =======================================================

routerUsuario.post('/', (req: Request, res: Response) => {

    controllerUsuario.post( req.body )
        .then( ( respuesta: any ) => {
            responseUsuario.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseUsuario.error(req, res, err.msn, err.status, err.err);
        });

});

module.exports = routerUsuario;
