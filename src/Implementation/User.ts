import {Nickname} from '../Model/types';
import {User as UserDefinition} from '../Model/User';
import {Catalogue} from '../Model/User/Catalogue';
import {UUID} from 'crypto';

export class User implements UserDefinition {
  readonly id: UUID = crypto.randomUUID();
  name: string;
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
  nickname: Nickname;

  constructor(
    creationDate = new Date(),
    lastModificationDate = new Date(),
    name: string,
    nickname: Nickname,
    email: string,
    birthDate: Date,
    gender: string,
    avatar: string,
    password: string,
    id: UUID = crypto.randomUUID()
  ) {
    this.nickname = nickname;
    this.creationDate = creationDate;
    this.lastModificationDate = lastModificationDate;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.avatar = avatar;
    this.password = password;
    this.birthDate = birthDate;
    this.catalogues = [];
    this.followers = [];
    this.following = [];
    this.id = id;
  }
}
