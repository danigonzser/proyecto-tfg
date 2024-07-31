export interface Label {
  readonly id: number;
  name: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  color: string;

  editarname(name: string): void;
  editardescription(description: string): void;
  editarColor(color: string): void;
}
