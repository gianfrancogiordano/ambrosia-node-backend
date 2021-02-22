"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
// import { FieldInfo } from "mysql";
// import { Err } from "../../classes/err";
const err_1 = require("../../classes/err");
const storelogin = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const getUsuario = (body) => {
    return new Promise((resolve, reject) => {
        storelogin.getUserLogin(body.usuario.uid, (err, data, fields) => {
            if (err) {
                reject(new err_1.Err('Error interno', 500, err));
                return;
            }
            resolve(data);
        });
    });
};
module.exports = {
    getUsuario
};
