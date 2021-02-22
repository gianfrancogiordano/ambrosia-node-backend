"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const config = require("../config-ilitia");
class MySQL {
    constructor() {
        this.conectado = false;
        this.mensaje = '';
        if (config.prod) {
            /*            this.cnn = mysql.createConnection({
                            port: config.cloudSQL.port,
                            user: config.cloudSQL.user,
                            password: config.cloudSQL.password,
                            database: config.cloudSQL.database,
                            socketPath: `/cloudsql/${ config.instancia_sql_gcp }`
                        });
            */
            this.cnn = mysql.createConnection({
                host: config.cloudSQL.host,
                user: config.cloudSQL.user,
                password: config.cloudSQL.password,
                database: config.cloudSQL.database,
            });
            this.mensaje = '[MySQL - Online (prod)]';
        }
        else {
            this.cnn = mysql.createConnection({
                host: config.mysql.host,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database,
            });
            this.mensaje = '[MySQL - Online (dev)]';
        }
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static execMysql(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err)
                return callback(err);
            callback(null, results, fields);
        });
    }
    static insertMysql(query, values, callback) {
        this.instance.cnn.query(query, values, (err, results, fields) => {
            if (err)
                return callback(err);
            callback(null, results, fields);
        });
    }
    static escape(parametro) {
        return this.instance.cnn.escape(parametro);
    }
    static current_timestamp() {
        return mysql.raw('CURRENT_TIMESTAMP()');
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log(this.mensaje);
        });
    }
}
exports.default = MySQL;
