export class Imagen {
    id: number;
    ancho: number;
    largo: number;
    formato: string;
    hash: string;
    url: string;

    constructor(id: number, ancho: number, largo: number, formato: string, hash: string, url: string) {
        this.id = id;
        this.ancho = ancho;
        this.largo = largo;
        this.formato = formato;
        this.hash = hash;
        this.url = url;
    }

}
