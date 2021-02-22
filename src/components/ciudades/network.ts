// =======================================================
//  Requerimentos
// =======================================================
const routerCiudades     = require('express').Router();
const responseCiudades   = require('../../routes/response'); // Respuestas unificadas del server
const controllerCiudades = require('../ciudades/controller');

// =======================================================
//  Metodos
// =======================================================

routerCiudades.get('/', (req: Request, res: Response) => {

    controllerCiudades.listar(req)
        .then( ( respuesta: any ) => {
            responseCiudades.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCiudades.error(req, res, err.msn, 500, err.err);
        });
});

module.exports = routerCiudades;
