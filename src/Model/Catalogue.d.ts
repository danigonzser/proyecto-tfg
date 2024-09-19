import {UUID} from 'crypto';
import {Meme} from './Catalogue/Meme';

export interface Catalogue {
  readonly id: UUID;
  title: string;
  description: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  memes: Meme[];
  cover: string; // Imagen
  isPrivate: boolean;
}
