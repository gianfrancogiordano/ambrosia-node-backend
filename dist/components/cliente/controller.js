"use strict";
// =======================================================
//  Requerimentos
// =======================================================
Object.defineProperty(exports, "__esModule", { value: true });
const err_1 = require("../../classes/err");
const storeCliente = require("./store");
// =======================================================
//  Metodos del controlador del componente
// =======================================================
const crearClientes = (body) => {
    return new Promise((resolve, reject) => {
        console.log(body);
        console.log(body.nombres);
        if (!body.negocio) {
            reject(new err_1.Err('Negocio requerido', 400, 'Negocio requerido'));
            return;
        }
        if (!body.nombres) {
            reject(new err_1.Err('Nombres requeridos', 400, 'Nombres requeridos'));
            return;
        }
        if (!body.documento) {
            reject(new err_1.Err('Documento requeridos', 400, 'Documento requeridos'));
            return;
        }
        if (!body.email) {
            reject(new err_1.Err('Email requeridos', 400, 'Email requeridos'));
            return;
        }
        if (!body.telefono) {
            reject(new err_1.Err('Telefono requeridos', 400, 'Telefono requeridos'));
            return;
        }
        if (!body.direccion) {
            reject(new err_1.Err('Direccion requeridos', 400, 'Direccion requeridos'));
            return;
        }
        if (!body.credito) {
            body.credito = 0;
        }
        if (!body.avatar) {
            body.avatar = '';
        }
        if (!body.ciudad) {
            reject(new err_1.Err('Ciudad requeridos', 400, 'Ciudad requeridos'));
            return;
        }
        if (!body.latitude) {
            reject(new err_1.Err('Latitud requeridos', 400, 'Latitud requeridos'));
            return;
        }
        if (!body.longitude) {
            reject(new err_1.Err('Longitud requeridos', 400, 'Longitud requeridos'));
            return;
        }
        const nuevoCliente = {
            negocio: body.negocio,
            nombres: body.nombres,
            documento: body.documento,
            email: body.email,
            telefono: body.telefono,
            direccion: body.direccion,
            credito: body.credito,
            avatar: body.avatar,
            ciudad: body.ciudad,
            lat: body.latitude,
            log: body.longitude,
            accuracy: body.accuracy,
            uid: body.usuario.uid
        };
        storeCliente.crear(nuevoCliente, (error, data) => {
            if (error) {
                reject(new err_1.Err(error.errno, 500, error));
                return;
            }
            resolve(data);
        });
    });
};
const ultimaFactura = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.params.idcliente) {
            reject(new err_1.Err('Error: id cliente requerido', 400, 'Error: id cliente requerido'));
            return;
        }
        storeCliente.getUltimaFactura(req.params.idcliente, (error, data) => {
            if (error) {
                reject(new err_1.Err(error.errno, 500, error));
                return;
            }
            resolve(data);
        });
    });
};
const infomeDiario = (body) => {
    return new Promise((resolve, reject) => {
        storeCliente.getInformeVentas(body.usuario.uid, (error, data) => {
            if (error) {
                reject(new err_1.Err(error.errno, 500, error));
                return;
            }
            resolve(data);
        });
    });
};
const facturapos = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.idCliente) {
            reject(new err_1.Err('Cliente requerido', 400, 'Cliente requeridos'));
            return;
        }
        if (!body.montoTotal) {
            reject(new err_1.Err('Monto requeridos', 400, 'Monto requeridos'));
            return;
        }
        if (!body.productos) {
            reject(new err_1.Err('Productos requeridos', 400, 'Productos requeridos'));
            return;
        }
        const nuevaFacturaPos = {
            idCliente: body.idCliente,
            montoTotal: body.montoTotal,
            productos: JSON.parse(body.productos),
            uid: body.usuario.uid
        };
        storeCliente.pos(nuevaFacturaPos, (error, data) => {
            if (error) {
                reject(new err_1.Err(error.errno, 500, error));
                return;
            }
            resolve(data);
        });
    });
};
const listarClientes = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.query.pagina) {
            reject(new err_1.Err('Error: pagina requerida', 400, 'Error: pagina requerida'));
            return;
        }
        if (!req.query.porPagina) {
            reject(new err_1.Err('Error: PorPagina es requerida', 400, 'Error: PorPagina requerida'));
            return;
        }
        if (!req.query.filtro) {
            req.query.filtro = null;
        }
        storeCliente.listarPaginado(req.query.pagina, req.query.porPagina, req.query.filtro, (errListar, dataCliente) => {
            if (errListar) {
                reject(new err_1.Err('Error Interno', 500, errListar));
            }
            resolve(dataCliente);
        });
    });
};
const verCliente = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.params.idcliente) {
            reject(new err_1.Err('Error: id cliente requerido', 400, 'Error: id cliente requerido'));
            return;
        }
        storeCliente.verCliente(req.params.idcliente, (errorVerCliente, dataVerCliente) => {
            if (errorVerCliente) {
                reject(new err_1.Err(errorVerCliente, 500, errorVerCliente));
            }
            resolve(dataVerCliente);
        });
    });
};
const listarMarcadores = () => {
    return new Promise((resolve, reject) => {
        storeCliente.listarMarcadores((errorVerMarcadores, dataVerMarcadores) => {
            if (errorVerMarcadores) {
                reject(new err_1.Err(errorVerMarcadores, 500, errorVerMarcadores));
            }
            resolve(dataVerMarcadores);
        });
    });
};
const listarZonas = () => {
    return new Promise((resolve, reject) => {
        storeCliente.listarZonas((errorVerZonas, dataVerZonas) => {
            if (errorVerZonas) {
                reject(new err_1.Err(errorVerZonas, 500, errorVerZonas));
            }
            resolve(dataVerZonas);
        });
    });
};
const listarRutas = (req) => {
    return new Promise((resolve, reject) => {
        storeCliente.listarRutas(req.params.idzona, (errorVerRutas, dataVerRutas) => {
            if (errorVerRutas) {
                reject(new err_1.Err(errorVerRutas, 500, errorVerRutas));
            }
            resolve(dataVerRutas);
        });
    });
};
const cambiarRuta = (req) => {
    return new Promise((resolve, reject) => {
        storeCliente.cambiarRuta(req.params.idruta, req.params.idcliente, (errorVerCambiarRuta, dataVerCambiarRuta) => {
            if (errorVerCambiarRuta) {
                reject(new err_1.Err(errorVerCambiarRuta, 500, errorVerCambiarRuta));
            }
            resolve(dataVerCambiarRuta);
        });
    });
};
const inforuta = (req) => {
    return new Promise((resolve, reject) => {
        storeCliente.inforuta(req.params.idruta, (errorVerCambiarRuta, dataVerCambiarRuta) => {
            if (errorVerCambiarRuta) {
                reject(new err_1.Err(errorVerCambiarRuta, 500, errorVerCambiarRuta));
            }
            resolve(dataVerCambiarRuta);
        });
    });
};
module.exports = {
    pos: facturapos,
    ver: verCliente,
    factura: ultimaFactura,
    create: crearClientes,
    listar: listarClientes,
    informe: infomeDiario,
    marcadores: listarMarcadores,
    zonas: listarZonas,
    rutas: listarRutas,
    cambioRuta: cambiarRuta,
    infoRuta: inforuta
};
