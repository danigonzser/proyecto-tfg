export interface Etiqueta {
  readonly id: number;
  nombre: string;
  descripcion: string;
  readonly fechaCreacion: Date;
  fechaModificacion: Date;
  color: string;

  editarNombre(nombre: string): void;
  editarDescripcion(descripcion: string): void;
  editarColor(color: string): void;
}
