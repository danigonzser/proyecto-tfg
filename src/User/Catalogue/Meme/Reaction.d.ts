export interface Reaction {
  readonly id: number;
  emoji: string;
  whoReact: User;
  readonly creationDate: Date;
  lastModificationDate: Date;

  changeEmoji(emoji: string): void;
}
