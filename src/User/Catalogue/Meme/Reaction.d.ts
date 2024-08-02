export interface Reaction {
  readonly id: UUID;
  emoji: string;
  whoReact: User;
  readonly creationDate: Date;
  lastModificationDate: Date;

  changeEmoji(emoji: string): void;
}
