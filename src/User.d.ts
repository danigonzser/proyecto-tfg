export interface User {
  readonly id: number;
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  readonly creationDate: Date;
  lastModificationDate: Date;
  catalogues: Catalogue[];
  followers: User[];
  following: User[];
  avatar: string;
  password: string;

  addCatalogue(catalogue: Catalogue): void;
  addFollower(user: User): void;
  addFollowing(user: User): void;

  removeCatalogue(catalogue: Catalogue): void;
  removeFollower(user: User): void;
  removeFollowing(user: User): void;

  changeName(name: string): void;
  changeEmail(email: string): void;
  changeBirthDate(birthdate: Date): void;
  changeGender(gender: string): void;
  changeAvatar(avatar: string): void;
  changePassword(password: string): void;

  getName(): string;
  getEmail(): string;
  getBirthDate(): Date;
  getGender(): string;
  getAvatar(): string;

  getCatalogues(): Catalogue[] | never;
  getFollowers(): User[] | never;
  getFollowing(): User[] | never;
}
