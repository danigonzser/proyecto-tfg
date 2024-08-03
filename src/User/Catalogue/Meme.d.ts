export const enum Role {
  Admin,
  Collaborator,
  Viewer,
}

export interface Meme {
  readonly id: UUID;
  title: string;
  content?: unknown;
  isTemplate: boolean;
  creator: User;
  allowedUserRoles: Map<User, Role>;
  readonly creationDate: Date;
  lastModificationDate: Date;
  labels: Label[];
  comments: Comment[];
  likes: User[];
  reactions: Reaction[];
  edits: Edit[];

  addLabel(label: Label): void;
  addComment(comment: Comment): void;
  addLike(user: User): void;
  addReaction(reaction: Reaction): void;
  addAllowedUser(user: User, role: Role): void;

  changeTitle(title: string): void;
  changeContent(content: unknown): void;
  changeTemplate(isTemplate: boolean): void;

  removeLabel(label: Label): void;
  removeComment(comment: Comment): void;
  removeLike(usuario: User): void;
  removeReaction(reaction: Reaction): void;
}
