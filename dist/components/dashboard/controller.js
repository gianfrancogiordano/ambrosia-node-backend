"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const err_1 = require("../../classes/err");
const storeDash = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const infomeDashboard = () => {
    return new Promise((resolve, reject) => {
        storeDash.getInformeDashboard((error, data) => {
            if (error) {
                reject(new err_1.Err(error.errno, 500, error));
                return;
            }
            resolve(data);
        });
    });
};
module.exports = {
    informe: infomeDashboard
};
