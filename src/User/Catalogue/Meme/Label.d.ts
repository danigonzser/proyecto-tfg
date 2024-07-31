export interface Label {
  readonly id: number;
  name: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  colour: string;

  changeName(name: string): void;
  changeDescription(description: string): void;
  changeColour(colour: string): void;
}
