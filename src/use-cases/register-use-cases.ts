import { UsersRepository } from "@/repositories/prisma/users-repository";
import { hash } from "bcryptjs";
import { UsersAlreadyExists } from "./errors/users-already-exists";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    foto: string;
}
// Essa classe é responsável por criar um novo usuário
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({nome, email, senha, foto}: RegisterUseCaseRequest) {
    const userWithEmail = await this.usersRepository.findByEmail(email);
    
      if (userWithEmail) {
        throw new UsersAlreadyExists();
      }
    
      const senha_hash = await hash(senha, 6)

      await this.usersRepository.create({
        nome,
        email,
        senha: senha_hash,
        foto
      });
    }
}
