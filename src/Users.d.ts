export interface Users {
  users: User[];

  addUser(user: User): void;
  removeUser(user: User): void;

  getUser(user: User): User;
  getUsers(): User[];
}
