import {User} from '../Model/User';
import {Users as UsersDefinition} from '../Model/Users';

export class Users implements UsersDefinition {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }
}
