import {Label} from './Meme/Label';
import {Reaction} from './Meme/Reaction';
import {User} from '../../User';
import {Edit, Role} from '../../types';
import {UUID} from 'crypto';
import {Comment} from './Meme/Comment';

export interface Meme {
  readonly id: UUID;
  title: string;
  content?: unknown;
  isTemplate: boolean;
  readonly creator: User;
  isPrivate: boolean;
  allowedUserRoles: Map<User, Role>;
  readonly creationDate: Date;
  lastModificationDate: Date;
  labels: Label[];
  comments: Comment[];
  likes: User[];
  reactions: Reaction[];
  edits: Edit[];
}
