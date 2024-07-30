export interface Usuario {
  readonly id: number;
  nombre: string;
  email: string;
  fechaNacimiento: Date;
  genero: string;
  readonly fechaCreacion: Date;
  fechaModificacion: Date;
  catalogos: Catalogo[];
  seguidores: Usuario[];
  siguiendo: Usuario[];
  avatar: string;
  contrasena: string;

  agregarCatalogo(catalogo: Catalogo): void;
  agregarSeguidor(usuario: Usuario): void;
  agregarSiguiendo(usuario: Usuario): void;

  eliminarCatalogo(catalogo: Catalogo): void;
  eliminarSeguidor(usuario: Usuario): void;
  eliminarSiguiendo(usuario: Usuario): void;

  editarNombre(nombre: string): void;
  editarEmail(email: string): void;
  editarFechaNacimiento(fechaNacimiento: Date): void;
  editarGenero(genero: string): void;
  editarAvatar(avatar: string): void;
  editarContrasena(contrasena: string): void;
}
