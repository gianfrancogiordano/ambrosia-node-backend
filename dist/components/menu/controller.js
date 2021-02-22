"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const err_1 = require("../../classes/err");
const storeMenu = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const listarMenu = (body) => {
    return new Promise((resolve, reject) => {
        storeMenu.listar(body.usuario.uid, (errListar, dataMenu) => {
            if (errListar) {
                reject(new err_1.Err('Error Interno', 500, errListar));
            }
            resolve(dataMenu);
        });
    });
};
module.exports = {
    listar: listarMenu
};
