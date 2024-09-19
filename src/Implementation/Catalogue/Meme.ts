import {UUID} from 'crypto';
import {Meme as MemeDefinition} from '../../Model/Catalogue/Meme';
import {Edit} from '../types';

export class Meme implements MemeDefinition {
  readonly id: UUID;
  title: string;
  content?: unknown;
  readonly creationDate: Date;
  lastModificationDate: Date;
  edits: Edit[];
  isPrivate: boolean;

  constructor(
    title: string,
    content: unknown,
    isPrivate: boolean,
    edits = new Array<Edit>(),
    creationDate = new Date(),
    lastModificationDate = new Date(),
    id = crypto.randomUUID()
  ) {
    this.isPrivate = isPrivate;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
    this.id = id;
    this.title = title;
    this.content = content;
    this.edits = edits;
  }
}
