import {UUID} from 'crypto';
import {User} from '../../../User';
import {ColorValueHex} from '../../../types';

export interface Label {
  readonly id: UUID;
  name: string;
  description: string;
  readonly owner: User;
  readonly creationDate: Date;
  lastModificationDate: Date;
  colour: ColorValueHex;
}
