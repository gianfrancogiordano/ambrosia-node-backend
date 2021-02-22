"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nombre, documento, email, usuario, password, role, img, google, _id) {
        this.nombre = nombre;
        this.documento = documento;
        this.email = email;
        this.usuario = usuario;
        this.password = password;
        this.role = role;
        this.img = img;
        this.google = google;
        this._id = _id;
    }
}
exports.Usuario = Usuario;
