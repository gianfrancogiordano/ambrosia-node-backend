"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =======================================================
//  Requerimientos
// =======================================================
const mysql_1 = __importDefault(require("../../store/mysql"));
const config = require("../../config-ilitia");
// =======================================================
// Funciones
// =======================================================
const getUltimaFactura = (idCliente, callback) => {
    const sql = `SELECT F.idfactura, F.fecha, F.sub_monto, F.iva as monto_iva, F.monto_total, DI.porcentaje_iva as iva, DI.resolucion_pos, DATE(DI.fecha_resolucion_pos) as fecha_resolucion_pos, DI.desde_pos, DI.hasta_pos, DI.prefijo,
                FP.descripcion as forma_pago, PE.nombres, PE.documento, PE.email, PE.telefono, PE.direccion, CI.municipio as ciudad, C.nombre_negocio as negocio, P.idpedido
                FROM pd_factura as F 
                JOIN ab_perfil PER on (F.ab_perfil_uid = PER.uid)
                JOIN pd_dian as DI on (F.pd_dian_iddian = DI.iddian)
                JOIN pd_forma_pago FP on (FP.idforma_pago = F.idforma_pago)
                JOIN pd_pedido as P on (F.idpedido = P.idpedido)
                JOIN pd_cliente as C on (P.idclientes = C.idclientes)
                JOIN pd_ciudad as CI on (CI.idmunicipio = C.municipio_idmunicipio)
                JOIN ab_persona as PE on (C.persona_idpersona = PE.idpersona)
                WHERE C.idclientes = ${idCliente} AND DATE(F.fecha) = DATE(CURRENT_DATE)
                ORDER BY F.idfactura DESC
                LIMIT 1`;
    mysql_1.default.execMysql(sql, (errUltimaFactura, dataUltimaFactura) => {
        if (errUltimaFactura) {
            callback(errUltimaFactura);
            return;
        }
        console.log(dataUltimaFactura);
        if (dataUltimaFactura.length > 0) {
            const pedido = dataUltimaFactura[0].idpedido;
            // Buscamos los productos de esa factura
            const sqlProductos = `SELECT PP.cantidad, PP.precio_unidad, PD.descripcion
                                    FROM pd_pedido_has_producto as PP
                                    JOIN pro_descripcion_producto PD on (PD.iddescripcion_producto = PP.descripcion_producto_iddescripcion_producto)
                                    WHERE PP.pedido_idpedido = ${pedido}`;
            mysql_1.default.execMysql(sqlProductos, (erroProductos, dataProductos) => {
                if (erroProductos) {
                    callback(erroProductos);
                    return;
                }
                const facturaCompleta = {
                    datos: dataUltimaFactura,
                    productos: dataProductos
                };
                callback(null, facturaCompleta);
            });
        }
        else {
            callback(null, dataUltimaFactura);
        }
    });
};
const getInformeVentas = (uid, callback) => {
    const sql = `SELECT DP.iddescripcion_producto as id, DP.descripcion as producto, SUM(cantidad) as cantidad, SUM(PP.precio_unidad) as monto 
                 FROM pd_pedido as P JOIN pd_pedido_has_producto AS PP on (PP.pedido_idpedido = P.idpedido) 
                 JOIN pro_descripcion_producto AS DP on (DP.iddescripcion_producto = PP.descripcion_producto_iddescripcion_producto) 
                 WHERE DATE(fecha) = DATE(CURRENT_DATE) AND P.ab_perfil_uid = '${uid}'
                 GROUP BY PP.descripcion_producto_iddescripcion_producto`;
    mysql_1.default.execMysql(sql, (errInforme, dataInforme) => {
        if (errInforme) {
            callback(errInforme);
            return;
        }
        console.log(dataInforme);
        callback(null, dataInforme);
    });
};
const pos = (facturapos, callback) => {
    console.log('Entrando a pos');
    const sql = `INSERT INTO pd_pedido (idpedido, monto, fecha, idclientes, idpedido_estado, ab_perfil_uid) 
                    VALUES (NULL, '${facturapos.montoTotal}', CURRENT_TIMESTAMP(), '${facturapos.idCliente}', '1', '${facturapos.uid}');`;
    mysql_1.default.instance.cnn.beginTransaction((errTransaction) => {
        if (errTransaction) {
            callback(errTransaction);
            return;
        }
        // Creamos el pedido
        mysql_1.default.execMysql(sql, (errPedido, dataPedido) => {
            if (errPedido) {
                mysql_1.default.instance.cnn.rollback(callback(errPedido));
                return;
            }
            const productos = facturapos.productos;
            const idPedido = dataPedido.insertId;
            let sql = `INSERT INTO pd_pedido_has_producto (pedido_idpedido, descripcion_producto_iddescripcion_producto, cantidad, precio_unidad) VALUES `;
            let values = '';
            for (let clave in productos['productos']) {
                // @ts-ignore
                values += `('${idPedido}', '${productos['productos'][clave].idProducto}', '${productos['productos'][clave].cantidad}', '${productos['productos'][clave].precio}'),`;
            }
            values = values.substring(0, values.length - 1);
            sql += values;
            // Insertamos los productos de la orden
            mysql_1.default.execMysql(sql, (errProductos, dataProductos) => {
                if (errProductos) {
                    mysql_1.default.instance.cnn.rollback(callback(errProductos));
                    return;
                }
                const monto = facturapos.montoTotal;
                const valorIva = config.iva;
                let submonto = monto / (1 + valorIva);
                let ivaMonto = submonto * valorIva;
                const sql = `INSERT INTO pd_factura (idfactura, fecha, sub_monto, descuento, iva, monto_total, idpedido, idforma_pago, pd_dian_iddian, ab_perfil_uid) 
                                VALUES (NULL, CURRENT_TIMESTAMP(), '${submonto.toFixed(2)}', '0', '${ivaMonto.toFixed(2)}', '${monto}', '${idPedido}', '1', '1', '${facturapos.uid}');`;
                console.log(sql);
                mysql_1.default.execMysql(sql, (errFactura, dataFactura) => {
                    if (errFactura) {
                        mysql_1.default.instance.cnn.rollback(callback(errFactura));
                        return;
                    }
                    mysql_1.default.instance.cnn.commit((err) => {
                        if (err) {
                            mysql_1.default.instance.cnn.rollback(callback(err));
                            return;
                        }
                        callback(null, dataFactura);
                    });
                });
            });
        });
    });
};
const crear = (cliente, callback) => {
    const sql = `INSERT INTO ab_persona SET ?`;
    const persona = {
        nombres: cliente.nombres,
        documento: cliente.documento,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion
    };
    mysql_1.default.instance.cnn.beginTransaction((errTransaction) => {
        if (errTransaction) {
            callback(errTransaction);
            return;
        }
        mysql_1.default.insertMysql(sql, persona, (errPersona, dataPersona) => {
            if (errPersona) {
                mysql_1.default.instance.cnn.rollback(callback(errPersona));
                return;
            }
            const CURRENT_TIMESTAMP = mysql_1.default.current_timestamp();
            const sqlCliente = `INSERT INTO pd_cliente SET ?`;
            const newCliente = {
                nombre_negocio: cliente.negocio,
                credito: cliente.credito,
                avatar: cliente.avatar,
                persona_idpersona: dataPersona.insertId,
                latitude: cliente.lat,
                longitude: cliente.log,
                accuracy: cliente.accuracy,
                municipio_idmunicipio: cliente.ciudad,
                ab_perfil_uid: cliente.uid,
                estado_cliente: 1,
                fecha_creacion: CURRENT_TIMESTAMP
            };
            mysql_1.default.insertMysql(sqlCliente, newCliente, (errCliente, dataCliente) => {
                if (errCliente) {
                    mysql_1.default.instance.cnn.rollback(callback(errCliente));
                    return;
                }
                mysql_1.default.instance.cnn.commit((err) => {
                    if (err) {
                        mysql_1.default.instance.cnn.rollback(callback(err));
                        return;
                    }
                    callback(null, dataCliente);
                });
            });
        });
    });
};
const verCliente = (clienteId, callbacK) => {
    const sql = `SELECT P.nombres, P.documento, P.email, P.telefono, P.direccion, C.nombre_negocio as negocio, C.avatar, C.latitude as lat, C.longitude as log, C.accuracy, U.municipio 
                 FROM ab_persona P 
                 JOIN pd_cliente C on (P.idpersona = C.persona_idpersona) 
                 JOIN pd_ciudad U on (C.municipio_idmunicipio = U.idmunicipio) 
                 WHERE C.idclientes = ${clienteId}`;
    mysql_1.default.execMysql(sql, (errorCliente, dataVerCliente) => {
        if (errorCliente) {
            callbacK(errorCliente);
            return;
        }
        callbacK(null, dataVerCliente);
    });
};
const listarPaginado = (pagina, porPagina, filtro, callback) => {
    // =======================================================
    // Columnas del query
    // =======================================================
    const aColumns = 'C.idclientes, C.nombre_negocio as negocio, P.nombres, P.documento, P.email, P.telefono, M.municipio, P.direccion';
    const sOrder = 'ORDER BY C.idclientes';
    // =======================================================
    // Tabla
    // =======================================================
    const sTable = 'ab_persona as P ' +
        'JOIN pd_cliente C on (C.persona_idpersona = P.idpersona) ' +
        'JOIN pd_ciudad as M on (C.municipio_idmunicipio = M.idmunicipio)';
    let clientesPaginados = {
        conteo: 0,
        data: [],
        pagActual: 0,
        pagSiguiente: 0,
        pagAnterior: 0,
        pagTotal: 0,
        paginas: []
    };
    const sqlCount = 'SELECT count(*) as conteo FROM ' + sTable;
    mysql_1.default.execMysql(sqlCount, (errorCount, cuantosBD) => {
        if (errorCount) {
            callback(errorCount);
            return;
        }
        clientesPaginados = Object.assign(Object.assign({}, clientesPaginados), { conteo: cuantosBD[0].conteo });
        let pag = pagina;
        const total_paginas = Math.ceil(clientesPaginados.conteo / porPagina);
        if (pag > total_paginas) {
            pag = total_paginas;
        }
        pag = pag - 1;
        let desde = pag * porPagina;
        if (desde < 0) {
            desde = 0;
        }
        let pag_siguiente;
        let pag_anterior;
        if (pag >= total_paginas - 1) {
            pag_siguiente = 1;
        }
        else {
            pag_siguiente = pag + 2;
        }
        if (pag < 1) {
            pag_anterior = total_paginas;
        }
        else {
            pag_anterior = pag;
        }
        clientesPaginados = Object.assign(Object.assign({}, clientesPaginados), { pagActual: (pag + 1), pagSiguiente: pag_siguiente, pagAnterior: pag_anterior, pagTotal: total_paginas });
        // =======================================================
        // Filtando la busqueda de las tablas
        // =======================================================
        let sQuery;
        if (filtro === null) {
            sQuery = '';
        }
        else {
            sQuery = ' WHERE P.nombres LIKE \'%' + filtro + '%\' OR P.documento LIKE \'%' + filtro + '%\' OR C.nombre_negocio LIKE \'%' + filtro + '%\' ';
        }
        // =======================================================
        // Query Final
        // =======================================================
        const sql = 'SELECT ' + aColumns + ' FROM ' + sTable + sQuery + sOrder + ' LIMIT ' + desde + ', ' + porPagina;
        mysql_1.default.execMysql(sql, (errListarCliente, dataClientes) => {
            if (errListarCliente) {
                callback(errListarCliente);
                return;
            }
            let arrayPag = [];
            for (let i = 0; i < total_paginas; i++) {
                arrayPag.push(i + 1);
            }
            clientesPaginados = Object.assign(Object.assign({}, clientesPaginados), { data: dataClientes, pagActual: (pag + 1), paginas: arrayPag });
            callback(null, clientesPaginados);
        });
    });
};
const listarMarcadores = (callbacK) => {
    const sql = `SELECT C.idclientes, P.nombres, P.documento, P.email, P.telefono, P.direccion, C.nombre_negocio as negocio, C.avatar, C.latitude as lat, C.longitude as log, C.accuracy, U.municipio, C.idruta, D.descripcion as dia, Z.descripcion as zona
                 FROM ab_persona P 
                 JOIN pd_cliente C on (P.idpersona = C.persona_idpersona) 
                 JOIN pd_ciudad U on (C.municipio_idmunicipio = U.idmunicipio)
                 JOIN pd_ruta R on (C.idruta = R.idruta)
                 JOIN pd_zona Z on (R.idzona = Z.idzona)
                 JOIN pd_dia D on (R.iddia = D.iddia)`;
    mysql_1.default.execMysql(sql, (errorMarcadores, dataVerMarcadores) => {
        if (errorMarcadores) {
            callbacK(errorMarcadores);
            return;
        }
        callbacK(null, dataVerMarcadores);
    });
};
const listarZonas = (callbacK) => {
    const sql = `SELECT idzona, descripcion FROM pd_zona`;
    mysql_1.default.execMysql(sql, (errorZonas, dataVerZonas) => {
        if (errorZonas) {
            callbacK(errorZonas);
            return;
        }
        callbacK(null, dataVerZonas);
    });
};
const listarRutas = (zonaId, callbacK) => {
    const sql = `SELECT idruta, pd_dia.descripcion FROM pd_ruta 
                 JOIN pd_dia on (pd_ruta.iddia = pd_dia.iddia) 
                 WHERE idzona = ${zonaId}`;
    mysql_1.default.execMysql(sql, (errorRutas, dataVerRutas) => {
        if (errorRutas) {
            callbacK(errorRutas);
            return;
        }
        callbacK(null, dataVerRutas);
    });
};
const cambiarRuta = (rutaid, clienteid, callbacK) => {
    const sql = `UPDATE pd_cliente SET idruta = ${rutaid} WHERE idclientes = ${clienteid}`;
    mysql_1.default.execMysql(sql, (errorCambioRutas, dataVerCambioRutas) => {
        if (errorCambioRutas) {
            callbacK(errorCambioRutas);
            return;
        }
        callbacK(null, dataVerCambioRutas);
    });
};
const inforuta = (rutaid, callbacK) => {
    const respuesta = {
        cantidadClientes: 0,
        presupuestoRuta: 0
    };
    let sql = `SELECT COUNT(*) as cantidadClientes FROM pd_cliente WHERE idruta = ${rutaid}`;
    mysql_1.default.execMysql(sql, (errorCantidadClientes, dataCantidadClientes) => {
        if (errorCantidadClientes) {
            callbacK(errorCantidadClientes);
            return;
        }
        respuesta.cantidadClientes = dataCantidadClientes[0].cantidadClientes;
        sql = `SELECT CEIL(sum(monto)/count(*)) as promedioClientes FROM pd_pedido 
                JOIN pd_cliente ON (pd_pedido.idclientes = pd_cliente.idclientes) 
                WHERE pd_cliente.idruta = ${rutaid} 
                GROUP BY pd_pedido.idclientes`;
        mysql_1.default.execMysql(sql, (errorPresupuestoRuta, dataVerPresupuestoRuta) => {
            if (errorPresupuestoRuta) {
                callbacK(errorPresupuestoRuta);
                return;
            }
            let sumaPromedios = 0;
            dataVerPresupuestoRuta.forEach((promedios) => {
                sumaPromedios += promedios.promedioClientes;
            });
            respuesta.presupuestoRuta = sumaPromedios;
            callbacK(null, respuesta);
        });
    });
};
module.exports = {
    pos,
    crear,
    verCliente,
    listarPaginado,
    getUltimaFactura,
    getInformeVentas,
    listarMarcadores,
    listarZonas,
    listarRutas,
    cambiarRuta,
    inforuta
};
