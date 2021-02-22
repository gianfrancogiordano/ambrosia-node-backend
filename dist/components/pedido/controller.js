"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const err_1 = require("../../classes/err");
const storePedido = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const hacerPedido = (body) => {
    return new Promise((resolve, reject) => {
        storePedido.hacerPedido(body, (errListar, dataPedido) => {
            if (errListar) {
                reject(new err_1.Err('Error Interno', 500, errListar));
            }
            resolve(dataPedido);
        });
    });
};
module.exports = {
    pedido: hacerPedido
};
