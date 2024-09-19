import {Edit} from '.././types';
import {UUID} from 'crypto';

export interface Meme {
  readonly id: UUID;
  title: string;
  content?: unknown;
  isPrivate: boolean;
  readonly creationDate: Date;
  lastModificationDate: Date;
  edits: Edit[];
}
