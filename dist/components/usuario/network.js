"use strict";
// =======================================================
//  Requerimentos
// ======================================================
const routerUsuario = require("express").Router();
const responseUsuario = require("../../routes/response"); // Respuestas unificadas del server
const controllerUsuario = require("./controller"); // Controlador del componente
const jwtUsuario = require("../../middlewares/authentication");
// =======================================================
//  Metodos
// =======================================================
routerUsuario.post('/', (req, res) => {
    controllerUsuario.post(req.body)
        .then((respuesta) => {
        responseUsuario.success(req, res, respuesta, 200);
    })
        .catch((err) => {
        responseUsuario.error(req, res, err.msn, err.status, err.err);
    });
});
module.exports = routerUsuario;
