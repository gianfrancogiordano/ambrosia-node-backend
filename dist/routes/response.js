"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = (req, res, msn, status) => {
    res.status(status).send({
        ok: true,
        body: msn
    });
};
exports.error = (req, res, msn, status, error) => {
    // Solo se muesta en el servidor: Con esto sabemos que es lo que pasa con las peticiones. Deberiamos de guardarlas ...
    console.log(`[ERROR-RESPONSE]: ${error}`);
    res.status(status).send({
        ok: false,
        body: msn
    });
};
