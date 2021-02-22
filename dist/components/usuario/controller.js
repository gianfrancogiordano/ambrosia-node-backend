"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// =======================================================
//  Requerimentos
// =======================================================
const usuario_1 = require("../../classes/usuario");
const err_1 = require("../../classes/err");
const store = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const guargarUsuario = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.nombre) {
            reject(new err_1.Err('Nombre es requerido', 400, 'Error de campo requerido - Nombre'));
            return;
        }
        if (!body.documento) {
            reject(new err_1.Err('Documento es requerido', 400, 'Error de campo requerido - Documento'));
            return;
        }
        if (!body.email) {
            reject(new err_1.Err('Email es requerido', 400, 'Error de campo requerido - Email'));
            return;
        }
        if (!body.usuario) {
            reject(new err_1.Err('Usuario es requerido', 400, 'Error de campo requerido - Usuario'));
            return;
        }
        if (!body.password) {
            reject(new err_1.Err('Password es requerido', 400, 'Error de campo requerido - Password'));
            return;
        }
        const nuevoUsuario = new usuario_1.Usuario(body.nombre, body.documento, body.email, body.usuario, body.password, body.role);
        store.newUser(nuevoUsuario, (err, data, fields) => {
            if (err)
                reject(new err_1.Err(err.sqlMessage, 500, err));
            resolve(data);
        });
    });
};
module.exports = {
    post: guargarUsuario
};
