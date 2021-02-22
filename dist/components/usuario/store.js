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
const nuevoUsuario = (usuario, callback) => {
    const sql = `INSERT INTO persona SET ?`;
    const values = {
        idpersona: null,
        nombres: usuario.nombre,
        documento: usuario.documento,
        email: usuario.email,
        rol_idrol: usuario.role
    };
    mysql_1.default.instance.cnn.beginTransaction((errInit) => {
        if (errInit) {
            callback(errInit);
            return;
        }
        mysql_1.default.insertMysql(sql, values, (errInsert, data1) => {
            if (errInsert) {
                mysql_1.default.instance.cnn.rollback(callback(errInsert));
                return;
            }
            const sql2 = 'INSERT INTO perfil SET ?';
            const values2 = {
                usuario: usuario.usuario,
                password: usuario.password,
                persona_idpersona: data1.insertId
            };
            mysql_1.default.insertMysql(sql2, values2, (errInsert2, data2) => {
                if (errInsert2) {
                    mysql_1.default.instance.cnn.rollback(callback(errInsert2));
                    return;
                }
                mysql_1.default.instance.cnn.commit((errCommit) => {
                    if (errCommit) {
                        mysql_1.default.instance.cnn.rollback(callback(errCommit));
                        return;
                    }
                    callback(null, data2);
                });
            });
        });
    });
};
module.exports = {
    newUser: nuevoUsuario,
};
