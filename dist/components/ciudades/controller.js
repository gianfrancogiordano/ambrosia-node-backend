"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const err_1 = require("../../classes/err");
const storeCiudades = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const listarCiudades = (req) => {
    return new Promise((resolve, reject) => {
        storeCiudades.listar((errListar, dataCiudades) => {
            if (errListar) {
                reject(new err_1.Err('Error Interno', 500, errListar));
            }
            resolve(dataCiudades);
        });
    });
};
module.exports = {
    listar: listarCiudades
};
