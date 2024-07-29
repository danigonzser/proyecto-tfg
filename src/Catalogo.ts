interface Catalogo{
    readonly id: number;
    titulo: string;
    descripcion: string;
    readonly fechaCreacion: Date;
    fechaModificacion: Date;
    memes: Meme[];
    habilitados: Usuario[];
    etiquetas: Etiqueta[];
    portada: string;
    esPrivado: boolean;
}