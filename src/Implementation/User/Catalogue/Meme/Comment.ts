import {UUID} from 'crypto';
import {Comment as CommentDefinition} from '../../../../Model/User/Catalogue/Meme/Comment';
import {User} from '../../../User';

export class Comment implements CommentDefinition {
  readonly id: UUID;
  content: string;
  readonly creationDate!: Date;
  lastModificationDate!: Date;
  readonly creator: User;

  constructor(
    content: string,
    creator: User,
    creationDate = new Date(),
    lastModificationDate = new Date(),
    id = crypto.randomUUID()
  ) {
    this.id = id;
    this.content = content;
    this.creator = creator;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
  }
}
