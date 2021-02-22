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
const getUserLogin = (uid, callback) => {
    const sql = `SELECT PE.nombres, R.descripcion as role, P.avatar FROM
                ab_perfil as P JOIN ab_rol as R on (P.rol_idrol = R.idrol)
                JOIN ab_persona as PE on (PE.idpersona = P.ab_persona_idpersona)
                WHERE P.uid = '${uid}'`;
    mysql_1.default.execMysql(sql, (error, data) => {
        if (error)
            return callback(error);
        callback(null, data);
    });
};
module.exports = {
    getUserLogin,
};
