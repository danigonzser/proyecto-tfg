import {UUID} from 'crypto';
import {Meme as MemeDefinition} from '../../../Model/User/Catalogue/Meme';
import {User} from '../../User';
import {Label} from './Meme/Label';
import {Comment} from './Meme/Comment';
import {Reaction} from './Meme/Reaction';
import {Edit} from '../../types';
import {Role} from '../../../Model/types';

export class Meme implements MemeDefinition {
  readonly id: UUID;
  title: string;
  content?: unknown;
  isTemplate: boolean;
  readonly creator: User;
  allowedUserRoles: Map<User, Role>;
  readonly creationDate: Date;
  lastModificationDate: Date;
  labels: Label[];
  comments: Comment[];
  likes: User[];
  reactions: Reaction[];
  edits: Edit[];
  isPrivate: boolean;

  constructor(
    title: string,
    isTemplate: boolean,
    creator: User,
    content: unknown,
    isPrivate: boolean,
    labels = new Array<Label>(),
    edits = new Array<Edit>(),
    allowedUserRoles = new Map<User, Role>(),
    creationDate = new Date(),
    lastModificationDate = new Date(),
    comments = new Array<Comment>(),
    likes = new Array<User>(),
    reactions = new Array<Reaction>(),
    id = crypto.randomUUID()
  ) {
    this.isPrivate = isPrivate;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
    this.allowedUserRoles = allowedUserRoles;
    this.comments = comments;
    this.likes = likes;
    this.reactions = reactions;
    this.id = id;
    this.title = title;
    this.isTemplate = isTemplate;
    this.creator = creator;
    this.content = content;
    this.labels = labels;
    this.edits = edits;
  }
}
