"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = require('../middlewares/authentication');
const login = require("../components/login/network");
const menu = require("../components/menu/network");
const usuario = require("../components/usuario/network");
const cliente = require("../components/cliente/network");
const ciudades = require("../components/ciudades/network");
const dashboard = require("../components/dashboard/network");
// =======================================================
//  Rutas principales
// =======================================================
const routes = (server) => {
    server.use('/login', auth.verificarToken, login);
    server.use('/menu', auth.verificarToken, menu);
    server.use('/usuario', auth.verificarToken, usuario);
    server.use('/cliente', auth.verificarToken, cliente);
    server.use('/ciudades', auth.verificarToken, ciudades);
    server.use('/dashboard', auth.verificarToken, dashboard);
};
module.exports = routes;
