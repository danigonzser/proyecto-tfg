export interface Comment {
  readonly id: UUID;
  content: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  creator: User;

  changeContent(content: string): void;
}
