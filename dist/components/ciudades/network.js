"use strict";
// =======================================================
//  Requerimentos
// =======================================================
const routerCiudades = require('express').Router();
const responseCiudades = require('../../routes/response'); // Respuestas unificadas del server
const controllerCiudades = require('../ciudades/controller');
// =======================================================
//  Metodos
// =======================================================
routerCiudades.get('/', (req, res) => {
    controllerCiudades.listar(req)
        .then((respuesta) => {
        responseCiudades.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseCiudades.error(req, res, err.msn, 500, err.err);
    });
});
module.exports = routerCiudades;
