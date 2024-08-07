import {User} from '../../../User';
import {UUID} from 'crypto';

export interface Reaction {
  readonly id: UUID;
  readonly emoji: string;
  readonly whoReact: User;
  readonly creationDate: Date;
}
