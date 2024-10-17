import {UUID} from 'crypto';
import {Reaction as ReactionDefinition} from '../../../../Model/User/Catalogue/Meme/Reaction';
import {User} from '../../../User';

export class Reaction implements ReactionDefinition {
  readonly id: UUID;
  readonly emoji: string;
  readonly whoReact: User;
  readonly creationDate: Date;

  constructor(
    emoji: string,
    whoReact: User,
    creationDate = new Date(),
    id = crypto.randomUUID()
  ) {
    this.id = id;
    this.emoji = emoji;
    this.whoReact = whoReact;
    this.creationDate = creationDate;
  }
}
