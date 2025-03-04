import { UsersRepository } from "@/repositories/prisma/users-repository";
import { compare, hash } from "bcryptjs";
import { UsersAlreadyExists } from "./errors/users-already-exists-error";
import { Usuario } from "@prisma/client";
import { error } from "console";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string;
    senha: string;
}

interface AuthenticateUseCaseResponse {
    user: Usuario;
}
// Essa classe é responsável por criar um novo usuário
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({email, senha}: AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {
    const usuario = await this.usersRepository.findByEmail(email);
    
      if (!usuario) {
        throw new InvalidCredentialsError();
      }

      const doesSenhaMatch = await compare(senha, usuario.senha)
    
      if (!doesSenhaMatch) {
        throw new InvalidCredentialsError();
      }

      return {user: usuario};
    }
}
