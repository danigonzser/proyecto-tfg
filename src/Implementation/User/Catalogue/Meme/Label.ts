import {UUID} from 'crypto';
import {Label as LabelDefinition} from '../../../../Model/User/Catalogue/Meme/Label';
import {User} from '../../../../Model/User';
import {ColorValueHex} from '../../../../Model/types';

export class Label implements LabelDefinition {
  readonly id: UUID;
  readonly owner: User;
  name: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  colour: ColorValueHex;

  constructor(
    name: string,
    owner: User,
    description: string,
    colour: ColorValueHex,
    creationDate = new Date(),
    lastModificationDate = new Date(),
    id = crypto.randomUUID()
  ) {
    this.owner = owner;
    this.id = id;
    this.name = name;
    this.description = description;
    this.colour = colour;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
  }
}
