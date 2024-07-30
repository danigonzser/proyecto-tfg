export interface Usuarios {
  usuarios: Usuario[];

  agregarUsuario(usuario: Usuario): void;
  eliminarUsuario(usuario: Usuario): void;

  obtenerUsuario(usuario: Usuario): Usuario;
  obtenerUsuarios(): Usuario[];
}
