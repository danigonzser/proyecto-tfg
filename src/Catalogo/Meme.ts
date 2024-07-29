enum Rol{
    Administrador,
    Colaborador,
    Visualizador
}

interface Meme{
    readonly id: number;
    titulo: string;
    contenido?: unknown;
    esPlantilla: boolean;
    creador: Usuario;
    colaboradores: Usuario[];
    visualizadores: Usuario[];
    habilitados: Map<Rol,Usuario>;
    readonly fechaCreacion: Date;
    fechaModificacion: Date;
    etiquetas: Etiqueta[];
    comentarios: Comentario[];
    likes: Usuario[];
    reacciones: Reaccion[];
    ediciones: Edicion[];
}