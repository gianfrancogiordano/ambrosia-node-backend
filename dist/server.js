"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const mysql_1 = __importDefault(require("./store/mysql"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = require('./routes/routes');
const config = require('./config-ilitia');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// =======================================================
// Express
// =======================================================
const server = express_1.default();
// =======================================================
// Cors
// =======================================================
server.use(cors_1.default({ origin: true }));
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
mysql_1.default.instance;
server.listen(config.port, () => {
    console.log(`[server up] at port ${config.port}`);
});
module.exports = server;
