export const enum Role {
  Admin,
  Collaborator,
  Viewer,
}

export interface Catalogue {
  readonly id: number;
  title: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  allowedUserRoles: Map<User, Role>;
  labels: Label[];
  cover: string; // Imagen
  private: boolean;

  addMeme(meme: Meme): void;
  addAllowedUser(user: User, role: Role): void;
  addLabel(label: Label): void;

  removeMeme(meme: Meme): void;
  removeAllowedUser(user: User): void;
  removeLabel(label: Label): void;

  changeTitle(title: string): void;
  changeDescription(description: string): void;
  changeCover(cover: string): void;
  changeVisibility(visibility: boolean): void;

  getMemes(): Meme[] | never;
  getAllowedUserRoles(): User[] | never;
  getAllowedUser(user: User): Role | undefined;
  getLabels(): Label[] | never;
}
