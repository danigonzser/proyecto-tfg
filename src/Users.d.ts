export interface Users {
  users: User[];

  addUser(User: User): void;
  removeUser(User: User): void;

  getUser(User: User): User;
  getUsers(): User[];
}
