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
const listar = (uid, callback) => {
    // =======================================================
    // Query Final
    // =======================================================
    const sql = `SELECT M.titulo, M.icono, M.url
                FROM aaa_ambrosia_menu as M 
                JOIN ab_rol as R on (R.idrol = M.ab_rol_idrol) 
                JOIN ab_perfil as P on (R.idrol = P.rol_idrol) 
                WHERE uid =  + '${uid}' ORDER BY posicion ASC`;
    mysql_1.default.execMysql(sql, (errMenu, dataMenu) => {
        if (errMenu) {
            callback(errMenu);
            return;
        }
        callback(null, dataMenu);
    });
};
module.exports = {
    listar
};
