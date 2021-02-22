"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('../classes/firebase');
const response = require('../routes/response');
// =======================================================
//  Verificacion de Token de usuario
// =======================================================
exports.verificarToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        response.error(req, res, 'Token Incorrecto', 401, 'Sin token');
        return;
    }
    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
        req.body.usuario = decodedToken;
        next();
    }).catch((err) => {
        return response.error(req, res, 'Token Incorrecto', 401, err);
    });
};
