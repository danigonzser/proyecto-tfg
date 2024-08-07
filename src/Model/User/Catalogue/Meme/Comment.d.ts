import {User} from '../../../User';
import {UUID} from 'crypto';

export interface Comment {
  readonly id: UUID;
  content: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  readonly creator: User;
}
