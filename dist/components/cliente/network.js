"use strict";
// =======================================================
//  Requerimentos
// =======================================================
const routerCliente = require('express').Router();
const responseCliente = require('../../routes/response'); // Respuestas unificadas del server
const controllerCliente = require('../cliente/controller');
// =======================================================
//  Metodos
// =======================================================
routerCliente.post('/', (req, res) => {
    controllerCliente.create(req.body)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, err.status, err.err);
    });
});
routerCliente.post('/facturapos', (req, res) => {
    controllerCliente.pos(req.body)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, err.status, err.err);
    });
});
routerCliente.get('/', (req, res) => {
    controllerCliente.listar(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/ultimafactura/:idcliente', (req, res) => {
    controllerCliente.factura(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/informediario', (req, res) => {
    controllerCliente.informe(req.body)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/marcadores', (req, res) => {
    controllerCliente.marcadores()
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/zonas', (req, res) => {
    controllerCliente.zonas()
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/rutas/:idzona', (req, res) => {
    controllerCliente.rutas(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/cambiarruta/:idruta/:idcliente', (req, res) => {
    controllerCliente.cambioRuta(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/inforuta/:idruta/', (req, res) => {
    controllerCliente.infoRuta(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
routerCliente.get('/:idcliente', (req, res) => {
    controllerCliente.ver(req)
        .then((respuesta) => {
        responseCliente.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCliente.error(req, res, err.msn, 500, err.err);
    });
});
module.exports = routerCliente;
