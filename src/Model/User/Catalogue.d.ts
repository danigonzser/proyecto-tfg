import {UUID} from 'crypto';
import {User} from '../User';
import {Meme} from './Catalogue/Meme';
import {Label} from './Catalogue/Meme/Label';
import {Role} from '../types';

export interface Catalogue {
  readonly id: UUID;
  title: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  owner: User;
  allowedUserRoles: Map<User, Role>;
  labels: Label[];
  cover: string; // Imagen
  isPrivate: boolean;
}
