export const enum Rol {
  Admin,
  Collaborator,
  Viewer,
}

export interface Catalogo {
  readonly id: number;
  title: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  allowedUserRoles: Map<Rol, User>;
  label: Label[];
  cover: string; // Imagen
  private: boolean;

  addMeme(meme: Meme): void;
  addAllowedUser(user: User, rol: Rol): void;
  addLabel(label: Label): void;

  removeMeme(meme: Meme): void;
  removeAllowedUser(User: User): void;
  removeLabel(label: Label): void;

  changeTitle(title: string): void;
  changeDescription(description: string): void;
  changeCover(cover: string): void;
  changeVisibility(visibility: boolean): void;

  getMemes(): Meme[] | never;
  getAllowedUserRoles(): User[] | never;
  getAllowedUser(user: User): Rol | undefined;
  getLabels(): Label[] | never;
}
