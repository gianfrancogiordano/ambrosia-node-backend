module.exports = {
    prod: true,
    iva: 0.19,
    port: process.env.PORT || 5000,
    instancia_sql_gcp: process.env.INSTANCE_CONNECTION_NAME || 'alimentos-colombeia:us-central1:ambrosia2020',

    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3306',
        user: process.env.MYSQL_USER || 'ggiordano',
        password: process.env.MYSQL_PASS || 'g576huh6',
        database: process.env.MYSQL_DB || 'bd_ambrosia_2020',
    },

    cloudSQL: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3306',
        user: process.env.MYSQL_USER || 'ambrosia',
        password: process.env.MYSQL_PASS || 'Gior*1798$2020',
        database: process.env.MYSQL_DB || 'bd_ambrosia_2020',
    }
}
