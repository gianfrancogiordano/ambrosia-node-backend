import { Request, Response } from "express";

exports.success = (req: Request, res: Response, msn: any, status: number) => {

    res.status(status).send({
        ok: true,
        body: msn
    });

};

exports.error = (req: Request, res: Response, msn: any, status: number, error: string) => {

    // Solo se muesta en el servidor: Con esto sabemos que es lo que pasa con las peticiones. Deberiamos de guardarlas ...
    console.log(`[ERROR-RESPONSE]: ${error}`);

    res.status(status).send({
        ok: false,
        body: msn
    });

};
