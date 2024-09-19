import {UUID} from 'crypto';

export interface Edit {
  id: UUID;
}

export type ColorValueHex = `#${string}`;

export type Nickname = `@${string}`;
