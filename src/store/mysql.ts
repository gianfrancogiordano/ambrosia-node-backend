import * as mysql from "mysql";
const config = require("../config-ilitia");

export default class MySQL {

    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: boolean = false;
    mensaje: string = '';

    constructor() {

        if( config.prod ) {

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

            this.mensaje = '[MySQL - Online (prod)]'

        } else {

            this.cnn = mysql.createConnection({
                host: config.mysql.host,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database,
            });

            this.mensaje = '[MySQL - Online (dev)]'
        }

        this.conectarDB();
    }

    public static get instance() {

        return this._instance || ( this._instance = new this() );
    }

    public static execMysql(query: string, callback: Function) {

        this.instance.cnn.query( query,(err, results: Object[], fields: mysql.FieldInfo[]) => {

            if( err )
                return callback( err );

            callback( null, results, fields );
        });
    }

    public static insertMysql( query: string, values: any, callback: Function ) {

        this.instance.cnn.query(query, values,(err, results, fields) => {
            if ( err )
                return callback( err );

            callback( null, results, fields );
        });
    }

    public static escape( parametro: any ) {

        return this.instance.cnn.escape( parametro );
    }

    public static current_timestamp() {
        return mysql.raw('CURRENT_TIMESTAMP()');
    }

    private conectarDB() {

        this.cnn.connect( (err: any) => {

            if( err ) {
                console.log( err.message );
                return;
            }

            this.conectado = true;
            console.log( this.mensaje );
        });

    }

}
