enum Privacidad {
  Publico,
  Privado,
  Compartido,
}

export interface Catalogo {
  readonly id: number;
  titulo: string;
  descripcion: string;
  readonly fechaCreacion: Date;
  fechaModificacion: Date;
  memes: Meme[];
  habilitados: Usuario[];
  etiquetas: Etiqueta[];
  portada: string; // Imagen
  privacidad: Privacidad;

  agregarMeme(meme: Meme): void;
  agregarHabilitado(usuario: Usuario): void;
  agregarEtiqueta(etiqueta: Etiqueta): void;

  eliminarMeme(meme: Meme): void;
  eliminarHabilitado(usuario: Usuario): void;
  eliminarEtiqueta(etiqueta: Etiqueta): void;

  editarTitulo(titulo: string): void;
  editarDescripcion(descripcion: string): void;
  editarPortada(portada: string): void;
  editarPrivacidad(esPrivado: boolean): void;

  obtenerMemes(): Meme[];
  obtenerHabilitados(): Usuario[];
  obtenerEtiquetas(): Etiqueta[];
}
