// =======================================================
//  Requerimentos
// =======================================================
const routerPedido     = require('express').Router();
const responsePedido   = require('../../routes/response'); // Respuestas unificadas del server
const controllerPedido = require('../pedido/controller');

// =======================================================
//  Metodos
// =======================================================

routerPedido.get('/', (req: Request, res: Response) => {

    controllerPedido.pedido( req.body )
        .then( ( respuesta: any ) => {
            responsePedido.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responsePedido.error(req, res, err.msn, 500, err.err);
        });
});

module.exports = routerPedido;
