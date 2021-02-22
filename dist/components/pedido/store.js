"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =======================================================
//  Requerimientos
// =======================================================
const mysql_1 = __importDefault(require("../../store/mysql"));
// =======================================================
// Funciones
// =======================================================
const hacerPedido = (pedido, callback) => {
    // =======================================================
    // Query Final
    // =======================================================
    const sql = ``;
    mysql_1.default.execMysql(sql, (errPedido, dataPedido) => {
        if (errPedido) {
            callback(errPedido);
            return;
        }
        callback(null, dataPedido);
    });
};
module.exports = {
    hacerPedido
};
