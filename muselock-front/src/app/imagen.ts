export class Imagen{
    id: number;
    url: string;
    ancho: string;
    largo: string;
    formato: string;

    constructor(
        id: number,
        url: string,
        ancho: string,
        largo: string,
        formato: string,
    ){
        this.id = id;
        this.url = url;
        this.ancho = ancho;
        this.largo = largo;
        this.formato = formato;
    }
}