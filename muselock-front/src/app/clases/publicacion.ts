import { Usuario } from "../clases/usuario";
import { Imagen } from "../clases/imagen";

export class Publicacion {
    id: number;
    likes: number;
    vistas: number;
    fechaPublicacion: Date;
    imagen: Imagen;
    usuario: Usuario;

    constructor(id: number, likes: number, vistas: number, fechaPublicacion: Date, imagen: Imagen,usuario: Usuario) {
        this.id = id;
        this.likes = likes;
        this.vistas = vistas;
        this.fechaPublicacion = fechaPublicacion;
        this.usuario = usuario;
        this.imagen = imagen;
    }

}
