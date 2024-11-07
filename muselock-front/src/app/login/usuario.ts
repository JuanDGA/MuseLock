import { Imagen } from "../imagen";

export class Usuario{
    id: number;
    nombre: string;
    usuario: string;
    imagen: Imagen;

    constructor(
        id: number,
        nombre: string,
        usuario: string,
        imagen: Imagen,
    ){
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.imagen = imagen;
    }
}