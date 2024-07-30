export const enum Rol {
  Administrador,
  Colaborador,
  Visualizador,
}

export interface Meme {
  readonly id: number;
  titulo: string;
  contenido?: unknown;
  esPlantilla: boolean;
  creador: Usuario;
  habilitados: Map<Rol, Usuario>;
  readonly fechaCreacion: Date;
  fechaModificacion: Date;
  etiquetas: Etiqueta[];
  comentarios: Comentario[];
  likes: Usuario[];
  reacciones: Reaccion[];
  ediciones: Edicion[];

  agregarEtiqueta(etiqueta: Etiqueta): void;
  agregarComentario(comentario: Comentario): void;
  agregarLike(usuario: Usuario): void;
  agregarReaccion(reaccion: Reaccion): void;
  agregarHabilitado(usuario: Usuario, rol: Rol): void;

  editarTitulo(titulo: string): void;
  editarContenido(contenido: unknown): void;
  editarPlantilla(esPlantilla: boolean): void;

  eliminarEtiqueta(etiqueta: Etiqueta): void;
  eliminarComentario(comentario: Comentario): void;
  eliminarLike(usuario: Usuario): void;
  eliminarReaccion(reaccion: Reaccion): void;
}
