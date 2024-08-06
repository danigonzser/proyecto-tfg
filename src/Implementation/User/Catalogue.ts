import {Catalogue as CatalogueDefinition} from '../../Model/User/Catalogue';

import {Meme} from './Catalogue/Meme';
import {User} from '../User';
import {Label} from './Catalogue/Meme/Label';
import {UUID} from 'crypto';
import {Role} from '../../Model/types';

export class Catalogue implements CatalogueDefinition {
  id: UUID;
  title: string;
  description: string;
  creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  owner: User;
  allowedUserRoles: Map<User, Role>;
  labels: Label[];
  cover: string;
  isPrivate: boolean;

  constructor(
    title: string,
    description: string,
    cover: string,
    privacity: boolean,
    owner: User,
    id = crypto.randomUUID(),
    creationDate = new Date(),
    lastModificationDate = new Date(),
    memes = new Array<Meme>(),
    labels = new Array<Label>(),
    allowedUserRoles = new Map<User, Role>()
  ) {
    this.memes = memes;
    this.allowedUserRoles = allowedUserRoles;
    this.labels = labels;
    this.lastModificationDate = lastModificationDate;
    this.creationDate = creationDate;
    this.id = id;
    this.allowedUserRoles = new Map<User, Role>();
    this.title = title;
    this.description = description;
    this.cover = cover;
    this.isPrivate = privacity;
    this.owner = owner;
  }
}
