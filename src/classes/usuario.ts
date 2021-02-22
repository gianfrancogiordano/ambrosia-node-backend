export class Usuario {

    constructor(
        public nombre: string,
        public documento: string,
        public email: string,
        public usuario: string,
        public password: string,
        public role?: string,
        public img?: string,
        public google?: string,
        public _id?: string
    ) { }

}
