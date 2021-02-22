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
const listar = (callback) => {
    // =======================================================
    // Query Final
    // =======================================================
    const sql = 'SELECT idmunicipio as id, municipio as ciudad FROM `pd_ciudad`';
    mysql_1.default.execMysql(sql, (errCiudades, dataCiudades) => {
        if (errCiudades) {
            callback(errCiudades);
            return;
        }
        callback(null, dataCiudades);
    });
};
module.exports = {
    listar
};
