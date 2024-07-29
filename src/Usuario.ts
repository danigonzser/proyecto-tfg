interface Usuario{
    readonly id: number;
    nombre: string;
    email: string;
    fechaNacimiento: Date;
    genero: string;
    readonly fechaCreacion: Date;
    fechaModificacion: Date;
    catalogos: Catalogo[];
    memes: Meme[];
    comentarios: Comentario[];
    likes: Likes[];
    reacciones: Reacciones[];
    seguidores: Usuario[];
    siguiendo: Usuario[];
    avatar: string;
    contrasena: string;
}