// =======================================================
//  Requerimentos
// =======================================================
const routerCliente     = require('express').Router();
const responseCliente   = require('../../routes/response'); // Respuestas unificadas del server
const controllerCliente = require('../cliente/controller');

// =======================================================
//  Metodos
// =======================================================

routerCliente.post('/', (req: Request, res: Response) => {

    controllerCliente.create( req.body )
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, err.status, err.err);
        });
});

routerCliente.post('/facturapos', (req: Request, res: Response) => {

    controllerCliente.pos( req.body )
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, err.status, err.err);
        });
});


routerCliente.get('/', (req: Request, res: Response) => {

    controllerCliente.listar(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/ultimafactura/:idcliente', (req: Request, res: Response) => {

    controllerCliente.factura(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/informediario', (req: Request, res: Response) => {

    controllerCliente.informe(req.body)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/marcadores', (req: Request, res: Response) => {

    controllerCliente.marcadores()
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/zonas', (req: Request, res: Response) => {

    controllerCliente.zonas()
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/rutas/:idzona', (req: Request, res: Response) => {

    controllerCliente.rutas(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/cambiarruta/:idruta/:idcliente', (req: Request, res: Response) => {

    controllerCliente.cambioRuta(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/inforuta/:idruta/', (req: Request, res: Response) => {

    controllerCliente.infoRuta(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

routerCliente.get('/:idcliente', (req: Request, res: Response) => {

    controllerCliente.ver(req)
        .then( ( respuesta: any ) => {
            responseCliente.success(req, res, respuesta, 200);
        })
        .catch( ( err: any ) => {
            responseCliente.error(req, res, err.msn, 500, err.err);
        });
});

module.exports = routerCliente;
