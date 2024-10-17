import {UUID} from 'crypto';

export interface Edit {
  id: UUID;
}

export type Role = 'Admin' | 'Collaborator' | 'Viewer' | 'None';

export type ColorValueHex = `#${string}`;

export type Nickname = `@${string}`;
