import * as bodyParser from 'body-parser';
import MySQL from "./store/mysql";
import express from 'express';
import cors from 'cors';

const router = require('./routes/routes');
const config = require('./config-ilitia');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// =======================================================
// Express
// =======================================================
const server = express();

// =======================================================
// Cors
// =======================================================
server.use( cors({ origin: true }) );

// =======================================================
// Midleware - BodyParser - parse application/x-www-form-urlencoded
// =======================================================
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// =======================================================
//  Routes
// =======================================================
router(server);

// =======================================================
// Mysql
// =======================================================
MySQL.instance;

server.listen( config.port,() => {
    console.log(`[server up] at port ${ config.port }`);
});

module.exports = server;
