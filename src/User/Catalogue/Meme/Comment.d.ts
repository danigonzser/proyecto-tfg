export interface Comment {
  readonly id: number;
  content: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  creator: User;

  changeContent(content: string): void;
}
