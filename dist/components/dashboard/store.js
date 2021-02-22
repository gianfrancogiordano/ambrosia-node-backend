"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =======================================================
//  Requerimientos
// =======================================================
const mysql_1 = __importDefault(require("../../store/mysql"));
const config = require("../../config-ilitia");
// =======================================================
// Funciones
// =======================================================
const getInformeDashboard = (callback) => {
    const sql = `SELECT DP.iddescripcion_producto as id, DP.descripcion as producto, SUM(cantidad) as cantidad, SUM(PP.precio_unidad) as monto 
                     FROM pd_pedido as P JOIN pd_pedido_has_producto AS PP on (PP.pedido_idpedido = P.idpedido) 
                     JOIN pro_descripcion_producto AS DP on (DP.iddescripcion_producto = PP.descripcion_producto_iddescripcion_producto) 
                     WHERE DATE(fecha) = DATE(CURRENT_DATE)
                     GROUP BY PP.descripcion_producto_iddescripcion_producto`;
    mysql_1.default.execMysql(sql, (errDiario, dataDiario) => {
        if (errDiario) {
            callback(errDiario);
            return;
        }
        const sql = `SELECT DP.iddescripcion_producto as id, DP.descripcion as producto, SUM(cantidad) as cantidad, SUM(PP.precio_unidad) as monto 
                        FROM pd_pedido as P JOIN pd_pedido_has_producto AS PP on (PP.pedido_idpedido = P.idpedido) 
                        JOIN pro_descripcion_producto AS DP on (DP.iddescripcion_producto = PP.descripcion_producto_iddescripcion_producto) 
                        WHERE MONTH(fecha) = MONTH(CURRENT_DATE)
                        GROUP BY PP.descripcion_producto_iddescripcion_producto`;
        mysql_1.default.execMysql(sql, (errMes, dataMes) => {
            if (errMes) {
                callback(errMes);
                return;
            }
            const res = {
                diario: dataDiario,
                mes: dataMes
            };
            callback(null, res);
        });
    });
};
module.exports = {
    getInformeDashboard
};
