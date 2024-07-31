export const enum Rol {
  Admin,
  Collaborator,
  Viewer,
}

export interface Meme {
  readonly id: number;
  title: string;
  content?: unknown;
  isTemplate: boolean;
  creator: User;
  allowedUserRoles: Map<Rol, User>;
  readonly creationDate: Date;
  lastModificationDate: Date;
  labels: Label[];
  comments: Comment[];
  likes: User[];
  reactions: Reaction[];
  edits: Edit[];

  addLabel(Label: Label): void;
  addComment(comment: Comment): void;
  addLike(user: User): void;
  addReaction(reaction: Reaction): void;
  addAllowedUser(user: User, role: Role): void;

  changeTitle(title: string): void;
  changeContent(content: unknown): void;
  changeTemplate(isTemplate: boolean): void;

  removeLabel(label: Label): void;
  removeComment(comment: Comment): void;
  removeLike(usuario: Usuario): void;
  removeReaction(reaction: Reaction): void;
}
