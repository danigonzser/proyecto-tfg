import {Catalogue as CatalogueDefinition} from '../Model/Catalogue';

import {Meme} from './Catalogue/Meme';
import {UUID} from 'crypto';

export class Catalogue implements CatalogueDefinition {
  readonly id: UUID;
  title: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  cover: string;
  isPrivate: boolean;

  constructor(
    title: string,
    description: string,
    cover: string,
    privacity: boolean,
    id = crypto.randomUUID(),
    creationDate = new Date(),
    lastModificationDate = new Date(),
    memes = new Array<Meme>()
  ) {
    this.memes = memes;
    this.lastModificationDate = lastModificationDate;
    this.creationDate = creationDate;
    this.id = id;
    this.title = title;
    this.description = description;
    this.cover = cover;
    this.isPrivate = privacity;
  }
}
