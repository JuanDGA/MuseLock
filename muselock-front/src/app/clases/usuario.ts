import { Imagen } from "../clases/imagen";

export class Usuario {
    id: number;
    nombre: string;
    password: string;
    usuario: string;
    correo: string;
    profesion: string;
    ciudad: string;
    pais: string;
    descripcion: string;
    fotoPerfil: Imagen;
    
    constructor(
        id: number,
        nombre: string,
        password: string,
        usuario: string,
        correo: string,
        profesion: string,
        ciudad: string,
        pais: string,
        descripcion: string,
        fotoPerfil: Imagen
    ){
        this.id = id;
        this.nombre = nombre;
        this.password = password;
        this.usuario = usuario;
        this.correo = correo;
        this.profesion = profesion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
    }
}
