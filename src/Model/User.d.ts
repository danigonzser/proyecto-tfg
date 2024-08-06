import {UUID} from 'crypto';
import {Catalogue} from './User/Catalogue';
import {Nickname} from './types';

export interface User {
  readonly id: UUID;
  name: string;
  nickname: Nickname;
  email: string;
  birthDate: Date;
  gender: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  catalogues: Catalogue[];
  followers: UUID[];
  following: UUID[];
  avatar: string;
  password: string;
}
