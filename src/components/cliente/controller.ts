// =======================================================
//  Requerimentos
// =======================================================

import { Err } from "../../classes/err";
const storeCliente = require("./store");

// =======================================================
//  Metodos del controlador del componente
// =======================================================

const crearClientes = ( body: any ) => {

    return new Promise( (resolve, reject) => {

        console.log( body );
        console.log( body.nombres );

        if ( !body.negocio ) {
            reject( new Err('Negocio requerido', 400, 'Negocio requerido') )
            return;
        }

        if ( !body.nombres ) {
            reject( new Err('Nombres requeridos', 400, 'Nombres requeridos') )
            return;
        }

        if ( !body.documento ) {
            reject( new Err('Documento requeridos', 400, 'Documento requeridos') )
            return;
        }


        if ( !body.email ) {
            reject( new Err('Email requeridos', 400, 'Email requeridos') )
            return;
        }


        if ( !body.telefono ) {
            reject( new Err('Telefono requeridos', 400, 'Telefono requeridos') )
            return;
        }


        if ( !body.direccion ) {
            reject( new Err('Direccion requeridos', 400, 'Direccion requeridos') )
            return;
        }


        if ( !body.credito ) {
           body.credito = 0;
        }


        if ( !body.avatar ) {
            body.avatar = '';
        }


        if ( !body.ciudad ) {
            reject( new Err('Ciudad requeridos', 400, 'Ciudad requeridos') )
            return;
        }


        if ( !body.latitude ) {
            reject( new Err('Latitud requeridos', 400, 'Latitud requeridos') )
            return;
        }


        if ( !body.longitude ) {
            reject( new Err('Longitud requeridos', 400, 'Longitud requeridos') )
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
        }

        storeCliente.crear(nuevoCliente, (error: any, data: any) => {

            if (error) {
                reject( new Err( error.errno, 500, error ) );
                return;
            }

            resolve( data );
        })

    });

}

const ultimaFactura = ( req: any) => {

    return new Promise( (resolve, reject) => {

        if ( !req.params.idcliente ) {
            reject( new Err('Error: id cliente requerido', 400, 'Error: id cliente requerido') );
            return;
        }

        storeCliente.getUltimaFactura( req.params.idcliente, (error: any, data: any) => {

            if (error) {
                reject( new Err( error.errno, 500, error ) );
                return;
            }

            resolve( data )

        });

    });

}

const infomeDiario = (body: any) => {

    return new Promise( (resolve, reject) => {

        storeCliente.getInformeVentas( body.usuario.uid, (error: any, data: any) => {

            if ( error ) {
                reject( new Err( error.errno, 500, error ) );
                return;
            }

            resolve( data );
        });

    });
}

const facturapos = ( body: any ) => {

    return new Promise( (resolve, reject) => {

        if ( !body.idCliente ) {
            reject( new Err('Cliente requerido', 400, 'Cliente requeridos') )
            return;
        }

        if ( !body.montoTotal ) {
            reject( new Err('Monto requeridos', 400, 'Monto requeridos') )
            return;
        }

        if ( !body.productos ) {
            reject( new Err('Productos requeridos', 400, 'Productos requeridos') )
            return;
        }

        const nuevaFacturaPos = {
            idCliente: body.idCliente,
            montoTotal: body.montoTotal,
            productos: JSON.parse(body.productos), // Array con productos: idPedido, idProducto, cantidad, precio
            uid: body.usuario.uid
        }

        storeCliente.pos(nuevaFacturaPos, (error: any, data: any) => {

            if (error) {
                reject( new Err( error.errno, 500, error ) );
                return;
            }

            resolve( data );
        })

    });
}

const listarClientes = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        if ( !req.query.pagina ) {
            reject( new Err('Error: pagina requerida', 400, 'Error: pagina requerida') );
            return;
        }

        if ( !req.query.porPagina ) {
            reject( new Err('Error: PorPagina es requerida', 400, 'Error: PorPagina requerida') );
            return;
        }

        if ( !req.query.filtro ) {
            req.query.filtro = null;
        }

        storeCliente.listarPaginado( req.query.pagina, req.query.porPagina, req.query.filtro, (errListar: any, dataCliente: any ) => {

            if ( errListar ) {
                reject( new Err('Error Interno', 500, errListar) );
            }

            resolve( dataCliente );
        });

    });

}

const verCliente = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        if ( !req.params.idcliente ) {
            reject( new Err('Error: id cliente requerido', 400, 'Error: id cliente requerido') );
            return;
        }

        storeCliente.verCliente( req.params.idcliente, ( errorVerCliente: any, dataVerCliente: any ) => {

            if ( errorVerCliente ) {
                reject( new Err( errorVerCliente, 500, errorVerCliente ) );
            }

            resolve( dataVerCliente );

        });

    });
}

const listarMarcadores = () => {

    return new Promise( ( resolve, reject ) => {

        storeCliente.listarMarcadores(( errorVerMarcadores: any, dataVerMarcadores: any ) => {

            if ( errorVerMarcadores ) {
                reject( new Err( errorVerMarcadores, 500, errorVerMarcadores ) );
            }

            resolve( dataVerMarcadores );

        });

    });
}

const listarZonas = () => {

    return new Promise( ( resolve, reject ) => {

        storeCliente.listarZonas(( errorVerZonas: any, dataVerZonas: any ) => {

            if ( errorVerZonas ) {
                reject( new Err( errorVerZonas, 500, errorVerZonas ) );
            }

            resolve( dataVerZonas );

        });

    });
}

const listarRutas = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        storeCliente.listarRutas( req.params.idzona,( errorVerRutas: any, dataVerRutas: any ) => {

            if ( errorVerRutas ) {
                reject( new Err( errorVerRutas, 500, errorVerRutas ) );
            }

            resolve( dataVerRutas );

        });

    });
}

const cambiarRuta = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        storeCliente.cambiarRuta( req.params.idruta, req.params.idcliente, ( errorVerCambiarRuta: any, dataVerCambiarRuta: any ) => {

            if ( errorVerCambiarRuta ) {
                reject( new Err( errorVerCambiarRuta, 500, errorVerCambiarRuta ) );
            }

            resolve( dataVerCambiarRuta );

        });

    });
}

const inforuta = ( req: any ) => {

    return new Promise( ( resolve, reject ) => {

        storeCliente.inforuta( req.params.idruta, ( errorVerCambiarRuta: any, dataVerCambiarRuta: any ) => {

            if ( errorVerCambiarRuta ) {
                reject( new Err( errorVerCambiarRuta, 500, errorVerCambiarRuta ) );
            }

            resolve( dataVerCambiarRuta );

        });

    });
}

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
