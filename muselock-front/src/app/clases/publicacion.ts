import { Usuario } from "../clases/usuario";
import { Imagen } from "../clases/imagen";

export class Publicacion {
    id: number;
    likes: number;
    vistas: number;
    fechaPublicacion: Date;
    usuario: Usuario;
    imagen: Imagen;

    constructor(id: number, likes: number, vistas: number, fechaPublicacion: Date, usuario: Usuario, imagen: Imagen) {
        this.id = id;
        this.likes = likes;
        this.vistas = vistas;
        this.fechaPublicacion = fechaPublicacion;
        this.usuario = usuario;
        this.imagen = imagen;
    }

}
