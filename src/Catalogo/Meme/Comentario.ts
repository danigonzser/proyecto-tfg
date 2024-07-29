interface Comentario{
    readonly id: number;
    contenido: string;
    readonly fechaCreacion: Date;
    fechaModificacion: Date;
    creador: Usuario;
}