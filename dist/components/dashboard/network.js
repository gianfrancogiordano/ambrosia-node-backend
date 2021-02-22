"use strict";
// =======================================================
//  Requerimentos
// =======================================================
const routerDashboard = require('express').Router();
const responseDashboard = require('../../routes/response'); // Respuestas unificadas del server
const controllerDashboard = require('../dashboard/controller');
// =======================================================
//  Metodos
// =======================================================
routerDashboard.get('/', (req, res) => {
    controllerDashboard.informe()
        .then((respuesta) => {
        responseDashboard.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseDashboard.error(req, res, err.msn, 500, err.err);
    });
});
module.exports = routerDashboard;
