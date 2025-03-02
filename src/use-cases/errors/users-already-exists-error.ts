export class UsersAlreadyExists extends Error {
  constructor() {
    super("Usuario já cadastrado");
  }
}