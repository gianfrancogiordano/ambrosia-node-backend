"use strict";
// =======================================================
//  Requerimentos
// =======================================================
const routerMenu = require('express').Router();
const responseMenu = require('../../routes/response'); // Respuestas unificadas del server
const controllerMenu = require('../menu/controller');
// =======================================================
//  Metodos
// =======================================================
routerMenu.get('/', (req, res) => {
    controllerMenu.listar(req.body)
        .then((respuesta) => {
        responseMenu.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseMenu.error(req, res, err.msn, 500, err.err);
    });
});
module.exports = routerMenu;
